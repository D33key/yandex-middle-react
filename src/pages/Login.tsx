import FormWrapper from '../components/form/FormWrapper';
import Main from '../components/ui/main/Main';
import { LOGIN_FORM_INPUTS_PROPS } from '../constansts/formInputs/loginInputs';
import { LOGIN_LINKS } from '../constansts/login-links';
import { fetchAuthLogin } from '../services/auth/asyncThunk/login';

export default function Login() {
	return (
		<Main variant='center'>
			<FormWrapper
				action={fetchAuthLogin}
				linksUnderFormArray={LOGIN_LINKS}
				inputsArray={LOGIN_FORM_INPUTS_PROPS}
				formTitle='Вход'
				buttonText='Войти'
				navigateOnSuccess='/'
			/>
		</Main>
	);
}
