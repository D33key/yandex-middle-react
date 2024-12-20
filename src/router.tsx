import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Loader from './components/loader/Loader';
import ProtectedLayout from './template/ProtectedLayout';
import NonAuthLayout from './template/UnprotectedLayout';

const Constructor = lazy(() => import('./pages/Constructor'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Profile = lazy(() => import('./pages/Profile'));
const Ingredients = lazy(() => import('./pages/Ingredients'));
const IngredientModal = lazy(
	() => import('./components/modal/ingredient-details/IngredientModal'),
);

export default function Router() {
	const location = useLocation();
	const background = location.state?.background;

	return (
		<Suspense fallback={<Loader />}>
			<Routes location={background ?? location}>
				<Route element={<ProtectedLayout />}>
					<Route path='/' element={<Constructor />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/ingredients/:id' element={<Ingredients />} />
				</Route>
				<Route element={<NonAuthLayout />}>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
					<Route path='/reset-password' element={<ResetPassword />} />
				</Route>
			</Routes>
			{background && (
				<Routes>
					<Route path='/ingredients/:id' element={<IngredientModal />} />
				</Routes>
			)}
		</Suspense>
	);
}
