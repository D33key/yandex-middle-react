import Link from '@/atoms/link/Link';
import { useAppDispatch } from '@/hooks/useRTK';
import { fetchAuthLogout } from '@/services/auth/asyncThunk/logout';
import { useNavigate } from 'react-router';

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

				navigate('/login');
			}}
		>
			Выход
		</Link>
	);
}
