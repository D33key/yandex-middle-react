import { Navigate, Outlet } from 'react-router';
import Loader from '../components/loader/Loader';
import useAuth from '../hooks/useAuth/useAuth';

export default function ProtectedLayout() {
	const { isLoading, userData } = useAuth();
	if (isLoading) {
		return <Loader />;
	}

	return userData ? <Outlet /> : <Navigate to='/login' replace />;
}
