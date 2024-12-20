import { Navigate, Outlet } from 'react-router';
import Loader from '../components/loader/Loader';
import useAuth from '../hooks/useAuth/useAuth';

export default function NonAuthLayout() {
	const { isLoading, isUserExist } = useAuth();
	if (isLoading) {
		return <Loader />;
	}

	return !isUserExist ? <Outlet /> : <Navigate to='/' replace />;
}
