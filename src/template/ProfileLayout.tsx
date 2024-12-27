import { Outlet } from 'react-router';
import Main from '@/atoms/main/Main';
import ProfileNavigation from '@/cells/profile-navigation/ProfileNavigation';

export default function ProfileLayout() {
	return (
		<div className='p-horizontal m-top-120 m-right-auto flex'>
			<ProfileNavigation />
			<Main>
				<Outlet />
			</Main>
		</div>
	);
}
