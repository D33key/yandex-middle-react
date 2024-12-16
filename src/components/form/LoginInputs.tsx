import { LoginFormInputsProps } from '../../constansts/formInputs/loginInputs';

interface LoginInputsProps {
	array: LoginFormInputsProps[];
}
export default function LoginInputs({ array }: LoginInputsProps) {
	return array.map((input) => {
		const Component = input.component!;
		const props = { ...input };

		delete props.component;

		/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */
		return <Component key={props.id} {...props} />;
	});
}
