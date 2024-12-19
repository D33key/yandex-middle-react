/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncThunk } from '@reduxjs/toolkit';
import { Button as ButtonYandex } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useAppDispatch } from '../../hooks/useRTK';
import TextWithLink, {
	type TextWithLinkProps,
} from '../text-with-link/TextWithLink';
import Subtitle from '../ui/heading/Subtitle';
import Typography from '../ui/typography/Typography';
import FormInputs, { InputsProps } from './LoginInputs';
import { useNavigate } from 'react-router';

export interface FormProps<Action extends AsyncThunk<any, any, any>> {
	action: Action;
	className?: string;
	formTitle: string;
	navigateOnSuccess?: `/${string}` | false;

	linksUnderFormArray: TextWithLinkProps['array'];
	inputsArray: InputsProps['array'];

	buttonText: string;
}

export default function FormWrapper<Action extends AsyncThunk<any, any, any>>({
	action,
	className = '',
	linksUnderFormArray,
	formTitle = '',
	inputsArray = [],
	buttonText = '',
	navigateOnSuccess = false,
}: FormProps<Action>) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);

	return (
		<ErrorBoundary fallback={<p>Произошла ошибка при отправке формы</p>}>
			<form
				action={async (formData) => {
					setError(null);

					try {
						const { type, payload } = await dispatch(action(formData));

						if (type.includes('rejected')) {
							setError(String(payload));
							return;
						}

						if (navigateOnSuccess) {
							navigate(navigateOnSuccess);
						}
					} catch (error) {
						console.error('Возникла ошибка при отправке данных');
						setError(
							'Возникла ошибка при отправке данных: ' +
								(error as Error).message,
						);
					}
				}}
				className={className}
			>
				<FormWrapper.Wrapper>
					<FormWrapper.Header title={formTitle} />
					<FormWrapper.Inputs array={inputsArray} />
					<FormWrapper.Button>{buttonText}</FormWrapper.Button>
				</FormWrapper.Wrapper>
				{error && (
					<Typography extraClass='red text-center'>
						Возникла ошибка: {error}
					</Typography>
				)}
				<FormWrapper.Links array={linksUnderFormArray} />
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

function Wrapper({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col gap-one-half justify-center items-center'>
			{children}
		</div>
	);
}

function Header({ title }: { title: string }) {
	return <Subtitle as='h3'>{title}</Subtitle>;
}

FormWrapper.Button = Button;
FormWrapper.Wrapper = Wrapper;
FormWrapper.Header = Header;
FormWrapper.Inputs = memo(FormInputs);
FormWrapper.Links = memo(TextWithLink);
