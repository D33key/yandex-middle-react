import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import cl from './Link.module.css';
import { NavLink, useMatch } from 'react-router';

interface LinkProps {
	Icon?: React.FC<TIconProps>;
	children: React.ReactNode;
	to: `/${string}`;
	onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
	variant?: 'default' | 'medium';
	paddingHorizontal?: boolean;
	forceActive?: boolean;
}

export default function Link({
	Icon,
	children,
	to,
	onClick,
	variant = 'default',
	paddingHorizontal = true,
	forceActive = false,
}: LinkProps) {
	const match = useMatch({
		path: to,
		end: true,
	});

	const type = match ? 'primary' : 'secondary';
	const textType = match ? '' : 'text_color_inactive';

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
			{Icon && <span className={cl.icon}>{<Icon type={type} />}</span>}
			<span className={forceActive ? '' : textType}>{children}</span>
		</NavLink>
	);
}
