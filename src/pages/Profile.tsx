import FormWrapper from '../components/form/FormWrapper';
import Main from '../components/ui/main/Main';
import { USER_FORM_INPUTS_PROPS } from '../constansts/formInputs/userInputs';
import { fetchAuthUpdateUser } from '../services/auth/asyncThunk/updateUser';

export default function Profile() {
	return (
		<Main className='p-horizontal m-top-120'>
			<FormWrapper
				action={fetchAuthUpdateUser}
				inputsArray={USER_FORM_INPUTS_PROPS}
				buttonText='Сохранить'
				shouldInputsHaveValue
			/>
		</Main>
	);
}
