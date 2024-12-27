import { Navigate, Outlet, useLocation } from 'react-router';
import Loader from '../molecules/loader';
import useAuth from '../hooks/useAuth/useAuth';
import AppHeader from '../molecules/header/AppHeader';

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
		<Navigate to='/login' replace />
	);
}
