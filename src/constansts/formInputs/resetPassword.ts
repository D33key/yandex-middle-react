import Input from '../../atoms/inputs/Input';
import PasswordInput from '../../atoms/inputs/PasswordInput';
import { FormInputsProps } from './loginInputs';

export const RESET_PASSWORD_FORM_INPUTS_PROPS: FormInputsProps[] = [
	{
		id: '1',
		type: 'password',
		name: 'password',
		placeholder: 'Введите новый пароль',
		errorText: 'Некорректный пароль',
		component: PasswordInput,
		required: true,
	},
	{
		id: '2',
		type: 'text',
		name: 'token',
		placeholder: 'Введите код из письма',
		errorText: 'Некорректный код из письма',
		component: Input,
		required: true,
	},
];
