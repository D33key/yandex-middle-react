import type { TextWithLinkProps } from '../../components/text-with-link/TextWithLink';

export const LOGIN_LINKS: TextWithLinkProps['array'] = [
	{
		text: 'Вы — новый пользователь?',
		link: '/register',
		linkText: 'Зарегистрироваться',
	},
	{
		text: 'Забыли пароль?',
		link: '/forgot-password',
		linkText: 'Восстановить пароль',
	},
];
