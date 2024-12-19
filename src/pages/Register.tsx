import FormWrapper from '../components/form/FormWrapper';
import Inputs from '../components/form/LoginInputs';
import Subtitle from '../components/ui/heading/Subtitle';
import Main from '../components/ui/main/Main';
import { REGISTER_FORM_INPUTS_PROPS } from '../constansts/formInputs/registerInputs';
import { REGISTER_LINKS } from '../constansts/register-links';

export default function Register() {
	return (
		<Main variant='center'>
			<FormWrapper action={fetchAuthLogin} linksArray={REGISTER_LINKS}>
				<div className='flex flex-col gap-one-half justify-center items-center'>
					<Subtitle as='h3'>Вход</Subtitle>
					<Inputs array={REGISTER_FORM_INPUTS_PROPS} />
					<FormWrapper.Button>Войти</FormWrapper.Button>
				</div>
			</FormWrapper>
		</Main>
	);
}
