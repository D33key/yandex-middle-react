import FormWrapper from '../components/form/FormWrapper';
import { USER_FORM_INPUTS_PROPS } from '../constansts/formInputs/userInputs';
import { fetchAuthUpdateUser } from '../services/auth/asyncThunk/updateUser';

export default function Profile() {
	return (
		<FormWrapper
			action={fetchAuthUpdateUser}
			inputsArray={USER_FORM_INPUTS_PROPS}
			buttonText='Сохранить'
			shouldInputsHaveValue
		/>
	);
}
