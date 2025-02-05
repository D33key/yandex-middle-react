import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Loader from './molecules/loader';
import ProtectedLayout from './template/ProtectedLayout';
import NonAuthLayout from './template/UnprotectedLayout';
import HeaderLayout from './template/HeaderLayout';
import { PAGE_URLS } from './constansts/page-urls';

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
const FeedId = lazy(() => import('./pages/FeedId'));
const ProfileLayout = lazy(() => import('./template/ProfileLayout'));

export default function Router() {
	const location = useLocation();
	const background = location.state?.background;

	return (
		<Suspense fallback={<Loader />}>
			<Routes location={background ?? location}>
				<Route element={<HeaderLayout />}>
					<Route element={<ProtectedLayout />}>
						<Route element={<ProfileLayout />}>
							<Route path={PAGE_URLS.profile}>
								<Route index element={<Profile />} />
								<Route
									path={PAGE_URLS.orders}
									element={<Feed isForSpecificUser />}
								/>
							</Route>
						</Route>
						<Route
							path={PAGE_URLS.ordersId}
							element={<FeedId isForSpecificUser />}
						/>
					</Route>

					<Route element={<NonAuthLayout />}>
						<Route path={PAGE_URLS.login} element={<Login />} />
						<Route path={PAGE_URLS.register} element={<Register />} />
						<Route
							path={PAGE_URLS.forgotPassword}
							element={<ForgotPassword />}
						/>
						<Route path={PAGE_URLS.resetPassword} element={<ResetPassword />} />
					</Route>
					<Route path={PAGE_URLS.ingredientsId} element={<Ingredients />} />

					<Route path={PAGE_URLS.main} element={<Constructor />} />
					<Route path={PAGE_URLS.feed} element={<Feed />} />
					<Route path={PAGE_URLS.feedId} element={<FeedId />} />
				</Route>
			</Routes>
			{background?.pathname === PAGE_URLS.main && (
				<Routes>
					<Route path={PAGE_URLS.ingredientsId} element={<IngredientModal />} />
				</Routes>
			)}
			{background?.pathname === PAGE_URLS.feed && (
				<Routes>
					<Route path={PAGE_URLS.feedId} element={<FeedModal />} />
				</Routes>
			)}
			{background?.pathname === PAGE_URLS.orders && (
				<Routes>
					<Route path={PAGE_URLS.ordersId} element={<FeedModal />} />
				</Routes>
			)}
		</Suspense>
	);
}
