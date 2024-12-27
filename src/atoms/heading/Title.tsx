import cl from './Title.module.css';

const TitleVariants = ['h1', 'h2', 'h3'] as const;

interface TitleProps {
	as?: (typeof TitleVariants)[number];
	children: React.ReactNode;
	isWide?: boolean;
}

export default function Title({
	children,
	as: Slot = 'h1',
	isWide = false,
}: TitleProps) {
	if (!TitleVariants.includes(Slot)) {
		throw new Error('Unavailable Title type');
	}
	return (
		<Slot
			className={`text text_type_main-large ${cl[Slot] ?? ''} ${
				isWide ? cl.wide : ''
			}`}
		>
			{children}
		</Slot>
	);
}
