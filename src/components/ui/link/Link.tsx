import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import cl from './Link.module.css';
import { NavLink } from 'react-router';

interface LinkProps {
	Icon?: React.FC<TIconProps>;
	children: React.ReactNode;
	isActive?: boolean;
	to: `/${string}`;
}

export default function Link({
	Icon,
	children,
	isActive = false,
	to,
}: LinkProps) {
	const type = isActive ? 'primary' : 'secondary';
	return (
		<NavLink to={to} className={cl.link + ' text text_type_main-default'}>
			{({ isActive }) => (
				<>
					{isActive && Icon && (
						<span className={cl.icon}>{<Icon type={type} />}</span>
					)}
					{children}
				</>
			)}
		</NavLink>
	);
}
