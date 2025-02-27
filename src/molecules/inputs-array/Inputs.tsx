import { InputsProps } from '@/types/Inputs';

export default function Inputs({ array }: InputsProps) {
	return array.map((input) => {
		const Component = input.component!;
		const props = { ...input };

		delete props.component;

		/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */
		return <Component key={props.id} {...props} />;
	});
}
