interface MainProps {
	children: React.ReactNode;
	variant: 'center' | 'wide';
}

const VARIANT = {
	center: 'flex flex-col h-screen justify-center',
	wide: '',
};

export default function Main({ children, variant = 'wide' }: MainProps) {
	return <main className={VARIANT[variant]}>{children}</main>;
}
