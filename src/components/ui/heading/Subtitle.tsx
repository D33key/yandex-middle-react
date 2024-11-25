import cl from './Subtitle.module.css';
type Props = {
	as?: 'h2' | 'h3';
	children: React.ReactNode;
	isWide?: boolean;
};

export default function Subtitle({
	as = 'h2',
	children,
	isWide = false,
}: Props) {
	const Slot = as;
	return (
		<Slot className={`text text_type_main-large ${isWide ? cl.wide : ''}`}>
			{children}
		</Slot>
	);
}
