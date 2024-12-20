import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import cl from './Link.module.css';
import { NavLink } from 'react-router';

interface LinkProps {
	Icon?: React.FC<TIconProps>;
	children: React.ReactNode;
	to: `/${string}`;
}

export default function Link({ Icon, children, to }: LinkProps) {
	return (
		<NavLink to={to} className={cl.link + ' text text_type_main-default'}>
			{({ isActive }) => {
				const type = isActive ? 'primary' : 'secondary';
				const textType = isActive ? '' : 'text_color_inactive';
				return (
					<>
						{Icon && <span className={cl.icon}>{<Icon type={type} />}</span>}
						<span className={textType}>{children}</span>
					</>
				);
			}}
		</NavLink>
	);
}
