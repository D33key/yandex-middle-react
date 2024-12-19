import Input from '../../components/inputs/Input';
import PasswordInput from '../../components/inputs/PasswordInput';
import { FormInputsProps } from './loginInputs';

export const REGISTER_FORM_INPUTS_PROPS: FormInputsProps[] = [
	{
		id: '1',
		type: 'text',
		name: 'name',
		placeholder: 'E-mail',
		errorText: 'Странное имя',
		component: Input,
	},
	{
		id: '2',
		type: 'email',
		name: 'email',
		placeholder: 'E-mail',
		errorText: 'Некорректная почта',
		component: Input,
	},
	{
		id: '3',
		name: 'password',
		placeholder: 'Пароль',
		errorText: 'Некорректный пароль',
		component: PasswordInput,
	},
];
