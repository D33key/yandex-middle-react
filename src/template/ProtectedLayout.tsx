import { Navigate, Outlet, useLocation } from 'react-router';
import { PAGE_URLS } from '@/constansts/page-urls';
import useAuth from '@/helpers/hooks/useAuth/useAuth';
import Loader from '@/molecules/loader';
import AppHeader from '@/molecules/header/AppHeader';

export default function ProtectedLayout() {
	const { pathname } = useLocation();
	const { isLoading, isUserExist } = useAuth(pathname);

	if (isLoading) {
		return <Loader />;
	}

	return isUserExist ? (
		<>
			<AppHeader />
			<Outlet />
		</>
	) : (
		<Navigate to={PAGE_URLS.login} replace />
	);
}
