import FormWrapper from '../components/form/FormWrapper';
import Main from '../components/ui/main/Main';
import { FORGOT_PASSWORD_LINKS } from '../constansts/forgot-password';
import { FORGOT_PASSWORD_FORM_INPUTS_PROPS } from '../constansts/formInputs/forgotPasswordInputs';
import { fetchAuthForgotPassword } from '../services/auth/asyncThunk/forgotPassword';

export default function ForgotPassword() {
	return (
		<Main variant='center'>
			<FormWrapper
				action={fetchAuthForgotPassword}
				linksUnderFormArray={FORGOT_PASSWORD_LINKS}
				inputsArray={FORGOT_PASSWORD_FORM_INPUTS_PROPS}
				formTitle='Восстановление пароля'
				buttonText='Восстановить'
				navigateOnSuccess='/reset-password'
			/>
		</Main>
	);
}
