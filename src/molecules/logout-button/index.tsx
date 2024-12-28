import Link from '@/atoms/link/Link';
import { PAGE_URLS } from '@/constansts/page-urls';
import { useAppDispatch } from '@/helpers/hooks/useRTK';
import { fetchAuthLogout } from '@/services/auth/asyncThunk/logout';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function LogoutButton() {
	const [isPending, setIsPending] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	return (
		<Link
			to={PAGE_URLS.login}
			variant='medium'
			forceActive={isPending}
			paddingHorizontal={false}
			onClick={async (e) => {
				e.preventDefault();
				setIsPending(true);

				await dispatch(fetchAuthLogout());
				setIsPending(false);

				navigate('/login');
			}}
		>
			{isPending ? 'Запрос на выход...' : 'Выход'}
		</Link>
	);
}
