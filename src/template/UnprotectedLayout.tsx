import { Navigate, Outlet } from 'react-router';
import { PAGE_URLS } from '@/constansts/page-urls';
import useAuth from '@/helpers/hooks/useAuth/useAuth';
import Loader from '@/molecules/loader';

export default function NonAuthLayout() {
	const { isLoading, isUserExist } = useAuth();

	if (isLoading) {
		return <Loader />;
	}

	return !isUserExist ? <Outlet /> : <Navigate to={PAGE_URLS.main} replace />;
}
