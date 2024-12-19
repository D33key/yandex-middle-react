import FormWrapper from '../components/form/FormWrapper';
import LoginInputs from '../components/form/LoginInputs';
import Subtitle from '../components/ui/heading/Subtitle';
import Main from '../components/ui/main/Main';
import { LOGIN_FORM_INPUTS_PROPS } from '../constansts/formInputs/loginInputs';
import { LOGIN_LINKS } from '../constansts/login-links';
import { fetchAuthLogin } from '../services/auth/asyncThunk/login';

export default function Login() {
	return (
		<Main variant='center'>
			<FormWrapper action={fetchAuthLogin} linksArray={LOGIN_LINKS}>
				<div className='flex flex-col gap-one-half justify-center items-center'>
					<Subtitle as='h3'>Вход</Subtitle>
					<LoginInputs array={LOGIN_FORM_INPUTS_PROPS} />
					<FormWrapper.Button>Войти</FormWrapper.Button>
				</div>
			</FormWrapper>
		</Main>
	);
}
