import FormWrapper from '../cells/form/FormWrapper';
import Main from '../atoms/main/Main';
import { FORGOT_PASSWORD_LINKS } from '../constansts/forgot-password';
import { RESET_PASSWORD_FORM_INPUTS_PROPS } from '../constansts/formInputs/resetPassword';
import { fetchAuthResetPassword } from '../services/auth/asyncThunk/resetPassword';

export default function ResetPassword() {
	return (
		<Main variant='center'>
			<FormWrapper
				action={fetchAuthResetPassword}
				linksUnderFormArray={FORGOT_PASSWORD_LINKS}
				inputsArray={RESET_PASSWORD_FORM_INPUTS_PROPS}
				formTitle='Восстановление пароля'
				buttonText='Сохранить'
				navigateOnSuccess='/login'
			/>
		</Main>
	);
}
