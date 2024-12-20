import { Navigate, Outlet } from 'react-router';
import Loader from '../components/loader/Loader';
import useAuth from '../hooks/useAuth/useAuth';
import AppHeader from '../components/header/AppHeader';

export default function ProtectedLayout() {
	const { isLoading, isUserExist } = useAuth();
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
