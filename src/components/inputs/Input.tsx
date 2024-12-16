import { Input as InputYandex } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

export type InputProps = Omit<
	Parameters<typeof InputYandex>[0],
	'value' | 'onChange'
>;

export default function Input(props: InputProps) {
	const [value, setValue] = useState('');

	return (
		<InputYandex
			{...props}
			onChange={(event) => setValue(event.target.value)}
			value={value}
			errorText={props.errorText}
			size={props.size ?? 'default'}
		/>
	);
}
