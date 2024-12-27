import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../hooks/useRTK';
import { fetchAuthLogout } from '../../services/auth/asyncThunk/logout';
import Link from '../ui/link/Link';
import { TOKENS } from '../../constansts';
import eraseCookie from '../../utils/cookies/eraseCookie';

export default function LogoutButton() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	return (
		<Link
			to='/login'
			variant='medium'
			paddingHorizontal={false}
			onClick={async (e) => {
				e.preventDefault();

				await dispatch(fetchAuthLogout());
				TOKENS.forEach((token) => eraseCookie(token));

				navigate('/login');
			}}
		>
			Выход
		</Link>
	);
}
