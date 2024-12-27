export const PROFILE_LINKS: ProfileLinks[] = [
	{ text: 'Профиль', href: '/profile' },
	{ text: 'История заказов', href: '/profile/orders' },
];

interface ProfileLinks {
	text: string;
	href: `/${string}`;
}
