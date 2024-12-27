import { PasswordInput as PasswordInputYandex } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

type PasswordInputProps = Omit<
	Parameters<typeof PasswordInputYandex>[0],
	'value' | 'onChange'
>;

export default function PasswordInput(props: PasswordInputProps) {
	const [value, setValue] = useState('');

	return (
		<PasswordInputYandex
			{...props}
			onChange={(event) => setValue(event.target.value)}
			value={value}
			errorText={props.errorText}
			size={props.size ?? 'default'}
		/>
	);
}
