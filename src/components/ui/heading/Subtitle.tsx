type Props = {
	as?: 'h2' | 'h3';
	children: React.ReactNode;
};

export default function Subtitle({ as = 'h2', children }: Props) {
	const Slot = as;
	return <Slot className='text text_type_main-medium'>{children}</Slot>;
}
