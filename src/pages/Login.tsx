import { Link } from 'react-router';
import FormWrapper from '../components/form/FormWrapper';
import LoginInputs from '../components/form/LoginInputs';
import Subtitle from '../components/ui/heading/Subtitle';
import Typography from '../components/ui/typography/Typography';
import { LOGIN_FORM_INPUTS_PROPS } from '../constansts/formInputs/loginInputs';
import { fetchAuthLogin } from '../services/auth/asyncThunk/login';

export default function Login() {
	return (
		<main className='flex flex-col h-screen justify-center'>
			<FormWrapper action={fetchAuthLogin}>
				<div className='flex flex-col gap-one-half justify-center items-center'>
					<Subtitle as='h3'>Вход</Subtitle>
					<LoginInputs array={LOGIN_FORM_INPUTS_PROPS} />
					<FormWrapper.Button>Войти</FormWrapper.Button>
				</div>
				<div className='flex flex-col text-center'>
					<Typography>
						Вы — новый пользователь?{' '}
						<Link to='/register' className='link-color'>
							Зарегистрироваться
						</Link>
					</Typography>
					<Typography>
						Забыли пароль?{' '}
						<Link to='/forgot-password' className='link-color'>
							Восстановить пароль
						</Link>
					</Typography>
				</div>
			</FormWrapper>
		</main>
	);
}
