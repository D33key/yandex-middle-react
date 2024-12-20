import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Link from '../ui/link/Link';
import cl from './AppHeader.module.css';

export default function AppHeader() {
	return (
		<header className={cl.wrapper}>
			<div className={cl.linksWrapper}>
				<Link to='/' Icon={BurgerIcon}>
					Конструктор
				</Link>
				<Link to='/' Icon={ListIcon}>
					Лента заказов
				</Link>
			</div>
			<div className={cl.logo}>
				<Logo />
			</div>
			<Link to='/profile' Icon={ProfileIcon}>
				Личный кабинет
			</Link>
		</header>
	);
}
