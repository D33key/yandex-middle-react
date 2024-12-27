import { Navigate, Outlet } from 'react-router';
import Loader from '../molecules/loader';
import useAuth from '../hooks/useAuth/useAuth';
import { PAGE_URLS } from '@/constansts/page-urls';

export default function NonAuthLayout() {
	const { isLoading, isUserExist } = useAuth();

	if (isLoading) {
		return <Loader />;
	}

	return !isUserExist ? <Outlet /> : <Navigate to={PAGE_URLS.main} replace />;
}
