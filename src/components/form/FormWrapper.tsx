/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncThunk } from '@reduxjs/toolkit';
import { Button as ButtonYandex } from '@ya.praktikum/react-developer-burger-ui-components';
import { ErrorBoundary } from 'react-error-boundary';
import { useAppDispatch } from '../../hooks/useRTK';
import { memo, useState } from 'react';
import Typography from '../ui/typography/Typography';
import TextWithLink, {
	type TextWithLinkProps,
} from '../text-with-link/TextWithLink';

export interface FormProps<Action extends AsyncThunk<any, any, any>> {
	action: Action;
	className?: string;
	children: React.ReactNode;

	linksArray: TextWithLinkProps['array'];
}

export default function FormWrapper<Action extends AsyncThunk<any, any, any>>({
	children,
	action,
	className = '',
	linksArray,
}: FormProps<Action>) {
	const dispatch = useAppDispatch();
	const [error, setError] = useState<string | null>(null);

	return (
		<ErrorBoundary fallback={<p>Произошла ошибка при отправке формы</p>}>
			<form
				action={async (formData) => {
					setError(null);

					const { type, payload } = await dispatch(action(formData));

					if (type.includes('rejected')) {
						setError(String(payload));
					}
				}}
				className={className}
			>
				{children}
				{error && (
					<Typography extraClass='red text-center'>
						Возникла ошибка: {error}
					</Typography>
				)}
				<FormWrapper.Links array={linksArray} />
			</form>
		</ErrorBoundary>
	);
}

function Button({ children }: { children: React.ReactNode }) {
	return (
		<ButtonYandex htmlType='submit' type='primary' size='medium'>
			{children}
		</ButtonYandex>
	);
}

FormWrapper.Button = Button;
FormWrapper.Links = memo(TextWithLink);
