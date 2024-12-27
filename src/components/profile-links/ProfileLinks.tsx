import { Outlet } from 'react-router';
import { PROFILE_LINKS } from '../../constansts/profile-links';
import LogoutButton from '../logout-button/LogoutButton';
import Link from '../ui/link/Link';
import Typography from '../ui/typography/Typography';
import Main from '../ui/main/Main';

export default function ProfileLinks() {
	return (
		<Main className='p-horizontal m-top-120 m-right-auto flex'>
			<nav className='flex flex-col m-right-60'>
				<div className='flex flex-col '>
					{PROFILE_LINKS.map(({ text, href }) => (
						<Link
							key={text}
							to={href}
							variant='medium'
							paddingHorizontal={false}
						>
							{text}
						</Link>
					))}
					<LogoutButton />
				</div>
				<Typography isInactive extraClass='w-320px margin-top-80px'>
					В этом разделе вы можете изменить свои персональные данные
				</Typography>
			</nav>
			<Outlet />
		</Main>
	);
}
