import cl from './Title.module.css';

const TitleVariants = ['h1', 'h2', 'h3'] as const;

export interface TitleProps {
	as?: (typeof TitleVariants)[number];
	children: React.ReactNode;
	isWide?: boolean;
	type?: 'digits-default' | 'main-large';
	isCenter?: boolean;
}

export default function Title({
	children,
	as: Slot = 'h1',
	isWide = false,
	type = 'main-large',
	isCenter = false,
}: TitleProps) {
	if (!TitleVariants.includes(Slot)) {
		throw new Error('Unavailable Title type');
	}
	return (
		<Slot
			className={`text text_type_${type} ${cl[Slot] ?? ''} ${
				isWide ? cl.wide : ''
			} ${isCenter ? 'center' : ''}`}
		>
			{children}
		</Slot>
	);
}
