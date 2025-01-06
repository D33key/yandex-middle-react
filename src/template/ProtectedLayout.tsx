import { PAGE_URLS } from '@/constansts/page-urls';
import useAuth from '@/helpers/hooks/useAuth/useAuth';
import Loader from '@/molecules/loader';
import { Navigate, Outlet, useLocation } from 'react-router';

export default function ProtectedLayout() {
	const { pathname } = useLocation();
	const { isLoading, isUserExist } = useAuth(pathname);

	if (isLoading) {
		return <Loader />;
	}

	return isUserExist ? <Outlet /> : <Navigate to={PAGE_URLS.login} replace />;
}
