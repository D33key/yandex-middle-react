import { Button as ButtonYandex } from '@ya.praktikum/react-developer-burger-ui-components';
import { ErrorBoundary } from 'react-error-boundary';
import { useAppDispatch } from '../../hooks/useRTK';

export interface FormProps {
	action: any;
	className?: string;
	children: React.ReactNode;
}

export default function FormWrapper({
	children,
	action,
	className = '',
}: FormProps) {
	const dispatch = useAppDispatch();

	return (
		<ErrorBoundary fallback={<p>Произошла ошибка при отправке формы</p>}>
			<form
				action={(formData) => {
					dispatch(action(formData));
				}}
				className={className}
			>
				{children}
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
