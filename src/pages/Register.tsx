import FormWrapper from '../cells/form/FormWrapper';
import Main from '../atoms/main/Main';
import { REGISTER_FORM_INPUTS_PROPS } from '../constansts/formInputs/registerInputs';
import { REGISTER_LINKS } from '../constansts/register-links';
import { fetchAuthRegister } from '../services/auth/asyncThunk/register';

export default function Register() {
	return (
		<Main variant='center'>
			<FormWrapper
				linksUnderFormArray={REGISTER_LINKS}
				inputsArray={REGISTER_FORM_INPUTS_PROPS}
				buttonText='Зарегистрироваться'
				formTitle='Регистрация'
				navigateOnSuccess='/'
				action={fetchAuthRegister}
			/>
		</Main>
	);
}
