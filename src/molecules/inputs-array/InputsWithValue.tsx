import { useAppSelector } from '@/hooks/useRTK';
import type { InputsProps } from '@/types/Inputs';

export default function InputsWithValue({ array }: InputsProps) {
	const userData = useAppSelector((state) => state.authSlice?.user);

	return array.map((input) => {
		const Component = input.component!;
		const props = { ...input };

		delete props.component;

		return (
			/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */
			<Component
				key={props.id}
				{...props}
				value={userData?.[props.name as keyof typeof userData] ?? ''}
			/>
		);
	});
}
