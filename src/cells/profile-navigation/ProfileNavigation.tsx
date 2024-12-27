import Link from '@/atoms/link/Link';
import Typography from '@/atoms/typography/Typography';
import LogoutButton from '@/molecules/logout-button';
import { PROFILE_LINKS } from '@/constansts/profile-links';

export default function ProfileNavigation() {
	return (
		<nav className='flex flex-col m-right-60'>
			<div className='flex flex-col '>
				{PROFILE_LINKS.map(({ text, href }) => (
					<Link key={text} to={href} variant='medium' paddingHorizontal={false}>
						{text}
					</Link>
				))}
				<LogoutButton />
			</div>
			<Typography isInactive extraClass='w-320px margin-top-80px'>
				В этом разделе вы можете изменить свои персональные данные
			</Typography>
		</nav>
	);
}
