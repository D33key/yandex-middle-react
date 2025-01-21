import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import type { AmountProps } from '../../types/burger-structure';
import type { RootState } from '@/services/store';
import { useAppSelector } from '@/helpers/hooks/useRTK';

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
