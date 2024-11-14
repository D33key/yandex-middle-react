import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import cl from './Link.module.css';

interface LinkProps {
	Icon: React.FC<TIconProps>;
	children: React.ReactNode;
	isActive?: boolean;
}

export default function Link({ Icon, children, isActive = false }: LinkProps) {
	const type = isActive ? 'primary' : 'secondary';
	return (
		<p className={cl.link + ' text text_type_main-default'}>
			<span className={cl.icon}>{<Icon type={type} />}</span>
			{children}
		</p>
	);
}
