interface MainProps {
	children: React.ReactNode;
	variant?: 'center' | 'wide';
	className?: string;
}

const VARIANT = {
	center: 'flex flex-col h-screen justify-center',
	wide: '',
};

export default function Main({
	children,
	variant = 'wide',
	className,
}: MainProps) {
	return <main className={VARIANT[variant] + ' ' + className}>{children}</main>;
}
