import Input, { InputProps } from '../../atoms/inputs/Input';
import PasswordInput from '../../atoms/inputs/PasswordInput';

export interface FormInputsProps extends Partial<InputProps> {
	id: string;
	component?: typeof Input | typeof PasswordInput;
}

export const LOGIN_FORM_INPUTS_PROPS: FormInputsProps[] = [
	{
		id: '1',
		type: 'email',
		name: 'email',
		placeholder: 'E-mail',
		errorText: 'Неверная почта',
		component: Input,
		required: true,
	},
	{
		id: '2',
		name: 'password',
		placeholder: 'Пароль',
		errorText: 'Неверный пароль',
		component: PasswordInput,
		required: true,
	},
];
