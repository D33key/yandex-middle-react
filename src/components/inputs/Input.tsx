import { Input as InputYandex } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

export type InputProps = Omit<Parameters<typeof InputYandex>[0], 'onChange'>;

export default function Input(props: InputProps) {
	const [value, setValue] = useState(props.value ?? '');

	return (
		<InputYandex
			{...props}
			onChange={(event) => setValue(event.target.value)}
			onBlur={(event) => {
				if (!event?.target.value && props.value) {
					setValue(props.value);
				}
			}}
			value={value}
			errorText={props.errorText}
			size={props.size ?? 'default'}
			icon={value && value !== props.value ? 'CloseIcon' : undefined}
			onIconClick={() => {
				setValue(props.value ?? '');
			}}
		/>
	);
}
