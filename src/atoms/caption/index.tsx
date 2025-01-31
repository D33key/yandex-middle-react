import React from 'react';

type Props = {
	children: React.ReactNode;
	color: 'red' | 'aqua';
};

export default function Caption({ children, color }: Props) {
	return (
		<span className={`text text_type_main-default ${color}`}>{children}</span>
	);
}
