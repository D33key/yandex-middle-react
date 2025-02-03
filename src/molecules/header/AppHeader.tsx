import Link from '@/atoms/link/Link';
import { NavLink } from 'react-router';
import { PAGE_URLS } from '@/constansts/page-urls';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cl from './AppHeader.module.css';

export default function AppHeader() {
	return (
		<header className={cl.wrapper}>
			<div className={cl.linksWrapper}>
				<Link to={PAGE_URLS.main} Icon={BurgerIcon}>
					Конструктор
				</Link>
				<Link to={PAGE_URLS.feed} Icon={ListIcon}>
					Лента заказов
				</Link>
			</div>
			<div className={cl.logo}>
				<NavLink to={PAGE_URLS.main}>
					<Logo />
				</NavLink>
			</div>
			<Link to={PAGE_URLS.profile} Icon={ProfileIcon}>
				Личный кабинет
			</Link>
		</header>
	);
}
