/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncThunk } from '@reduxjs/toolkit';
import { Button as ButtonYandex } from '@ya.praktikum/react-developer-burger-ui-components';
import { lazy, memo, Suspense, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import { TextWithLinkProps } from '@/types/TextWithLink';
import { InputsProps } from '@/types/Inputs';
import Loader from '@/molecules/loader';
import Title from '@/atoms/heading/Title';
import { useAppDispatch } from '@/helpers/hooks/useRTK';
import Typography from '@/atoms/typography/Typography';
import TextWithLink from '@/molecules/text-with-link/TextWithLink';
import Inputs from '@/molecules/inputs-array/Inputs';

const InputsWithValue = lazy(
	() => import('../../molecules/inputs-array/InputsWithValue'),
);

interface FormProps<Action extends AsyncThunk<any, any, any>> {
	action: Action;
	className?: string;
	formTitle?: string;
	navigateOnSuccess?: `/${string}` | false;

	linksUnderFormArray?: TextWithLinkProps['array'];
	inputsArray: InputsProps['array'];

	buttonText: string;
	shouldInputsHaveValue?: boolean;
}

export default function FormWrapper<Action extends AsyncThunk<any, any, any>>({
	action,
	className = '',
	linksUnderFormArray,
	formTitle = '',
	inputsArray = [],
	buttonText = '',
	navigateOnSuccess = false,
	shouldInputsHaveValue = false,
}: FormProps<Action>) {
	return (
		<ErrorBoundary fallback={<p>Произошла ошибка</p>}>
			<FormWrapper.Form
				navigateOnSuccess={navigateOnSuccess}
				action={action}
				className={className}
			>
				<FormWrapper.Wrapper>
					{formTitle && <FormWrapper.Header title={formTitle} />}
					{shouldInputsHaveValue ? (
						<Suspense fallback={<Loader />}>
							<InputsWithValue array={inputsArray} />
						</Suspense>
					) : (
						<FormWrapper.Inputs array={inputsArray} />
					)}

					<FormWrapper.Button>{buttonText}</FormWrapper.Button>
				</FormWrapper.Wrapper>
				{linksUnderFormArray && (
					<FormWrapper.Links array={linksUnderFormArray} />
				)}
			</FormWrapper.Form>
		</ErrorBoundary>
	);
}

function Button({ children }: { children: React.ReactNode }) {
	const { pending } = useFormStatus();
	return (
		<ButtonYandex htmlType='submit' size='medium' disabled={pending}>
			{!pending ? children : 'Отправляем...'}
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
	return <Title as='h3'>{title}</Title>;
}

type Form<Action extends AsyncThunk<any, any, any>> = Pick<
	FormProps<Action>,
	'action' | 'navigateOnSuccess' | 'className'
> & {
	children: React.ReactNode;
};

function Form<Action extends AsyncThunk<any, any, any>>({
	children,
	action,
	navigateOnSuccess,
	className,
}: Form<Action>) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);

	return (
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
					setError(
						'Возникла ошибка при отправке данных: ' + (error as Error).message,
					);
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
		</form>
	);
}

FormWrapper.Button = Button;
FormWrapper.Wrapper = Wrapper;
FormWrapper.Header = Header;
FormWrapper.Form = Form;
FormWrapper.Inputs = memo(Inputs);
FormWrapper.Links = memo(TextWithLink);
