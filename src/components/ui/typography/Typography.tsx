interface TypographyProps {
	as?: 'p' | 'span';
	type?: 'main' | 'digits';
	size?: 'medium' | 'large' | 'small' | 'default';
	isInactive?: boolean;
	extraClass?: string;
	children: React.ReactNode;
}

export default function Typography({
	as = 'p',
	type = 'main',
	size = 'default',
	isInactive = false,
	extraClass = '',
	children,
}: TypographyProps) {
	const Slot = as;
	const inactiveClass = isInactive ? 'text_color_inactive' : '';
	const className =
		`text text_type_${type}-${size} ${inactiveClass} ${extraClass}`.trim();

	return <Slot className={className}>{children}</Slot>;
}
