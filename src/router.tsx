import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Loader from './molecules/loader';
import ProtectedLayout from './template/ProtectedLayout';
import NonAuthLayout from './template/UnprotectedLayout';
import HeaderLayout from './template/HeaderLayout';

const Constructor = lazy(() => import('./pages/Constructor'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Profile = lazy(() => import('./pages/Profile'));
const Ingredients = lazy(() => import('./pages/Ingredients'));
const IngredientModal = lazy(() => import('./cells/ingredient-modal'));
const FeedModal = lazy(() => import('./cells/feed-modal'));
const Feed = lazy(() => import('./pages/Feed'));
const ProfileLayout = lazy(() => import('./template/ProfileLayout'));

export default function Router() {
	const location = useLocation();
	const background = location.state?.background;

	return (
		<Suspense fallback={<Loader />}>
			<Routes location={background ?? location}>
				<Route element={<ProtectedLayout />}>
					<Route element={<HeaderLayout />}>
						<Route element={<ProfileLayout />}>
							<Route path='/profile'>
								<Route index element={<Profile />} />
								<Route path='orders' element={<div>Заглушка</div>} />
							</Route>
						</Route>
					</Route>
					<Route path='/ingredients/:id' element={<Ingredients />} />
				</Route>
				<Route element={<NonAuthLayout />}>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
					<Route path='/reset-password' element={<ResetPassword />} />
				</Route>

				<Route element={<HeaderLayout />}>
					<Route path='/' element={<Constructor />} />
				</Route>
				<Route path='/feed' element={<Feed />} />
			</Routes>
			{background?.pathname === '/' && (
				<Routes>
					<Route path='/ingredients/:id' element={<IngredientModal />} />
				</Routes>
			)}
			{background?.pathname === '/feed' && (
				<Routes>
					<Route path='/feed/:id' element={<FeedModal />} />
				</Routes>
			)}
		</Suspense>
	);
}
