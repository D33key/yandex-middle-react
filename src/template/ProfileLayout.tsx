import ProfileNavigation from '@/cells/profile-navigation/ProfileNavigation';
import { Outlet } from 'react-router';

export default function ProfileLayout() {
	return (
		<div className='p-horizontal m-top-120 m-right-auto flex'>
			<ProfileNavigation />
			<Outlet />
		</div>
	);
}
