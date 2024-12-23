import Input from '../../components/inputs/Input';
import PasswordInput from '../../components/inputs/PasswordInput';
import { FormInputsProps } from './loginInputs';

export const USER_FORM_INPUTS_PROPS: FormInputsProps[] = [
	{
		id: '1',
		type: 'text',
		name: 'name',
		placeholder: 'Имя',
		errorText: 'Неверное имя',
		component: Input,
		required: true,
	},
	{
		id: '2',
		type: 'email',
		name: 'email',
		placeholder: 'Логин',
		errorText: 'Неверная почта',
		component: Input,
		required: true,
	},
	{
		id: '3',
		name: 'password',
		placeholder: 'Пароль',
		errorText: 'Неверный пароль',
		component: PasswordInput,
		required: true,
	},
];
