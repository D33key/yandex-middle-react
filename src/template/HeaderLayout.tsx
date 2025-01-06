import AppHeader from '@/molecules/header/AppHeader';
import { Outlet } from 'react-router';

export default function HeaderLayout() {
	return (
		<>
			<AppHeader />
			<Outlet />
		</>
	);
}
