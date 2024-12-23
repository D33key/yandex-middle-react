import Input from '../../components/inputs/Input';
import { FormInputsProps } from './loginInputs';

export const FORGOT_PASSWORD_FORM_INPUTS_PROPS: FormInputsProps[] = [
	{
		id: '1',
		type: 'email',
		name: 'email',
		placeholder: 'E-mail',
		errorText: 'Некорректная почта',
		component: Input,
		required: true,
	},
];
