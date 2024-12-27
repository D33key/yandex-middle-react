import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import cl from './Link.module.css';
import { NavLink } from 'react-router';

interface LinkProps {
	Icon?: React.FC<TIconProps>;
	children: React.ReactNode;
	to: `/${string}`;
	onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
	variant?: 'default' | 'medium';
	paddingHorizontal?: boolean;
}

export default function Link({
	Icon,
	children,
	to,
	onClick,
	variant = 'default',
	paddingHorizontal = true,
}: LinkProps) {
	return (
		<NavLink
			to={to}
			className={
				cl.link +
				` text text_type_main-${variant}` +
				`${paddingHorizontal ? '' : ' p-horizontal-none'}`
			}
			viewTransition
			onClick={onClick}
		>
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
