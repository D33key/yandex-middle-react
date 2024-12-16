import Input, { InputProps } from '../../components/inputs/Input';
import PasswordInput from '../../components/inputs/PasswordInput';

export interface LoginFormInputsProps extends Partial<InputProps> {
	id: string;
	component?: typeof Input | typeof PasswordInput;
}

export const LOGIN_FORM_INPUTS_PROPS: LoginFormInputsProps[] = [
	{
		id: '1',
		type: 'email',
		name: 'email',
		placeholder: 'E-mail',
		errorText: 'Неверная почта',
		component: Input,
	},
	{
		id: '2',
		name: 'password',
		placeholder: 'Пароль',
		errorText: 'Неверный пароль',
		component: PasswordInput,
	},
];
