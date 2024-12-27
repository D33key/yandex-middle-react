import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import type { AmountProps } from '../../types/burger-structure';
import { useAppSelector } from '@/hooks/useRTK';
import type { RootState } from '@/services/store';

function Amount({ id, type }: AmountProps) {
	const order = useAppSelector((state: RootState) => state.burgerStructure);

	const amount =
		type === 'bun'
			? order.filter((item) => item._id === id).length - 1
			: order.filter((item) => item._id === id).length;

	return (
		amount > 0 && <Counter count={amount} size='default' extraClass='m-1' />
	);
}

export default Amount;
