import { useAppDispatch, useAppSelector } from '../../../hooks/useRTK';
import { fetchOrder } from '../../../services/modal/asyncThunk';
import { RootState } from '../../../services/store';
import Amount from '../amount/Amount';
import EmptyCart from '../amount/EmptyCart';
import Element from '../element/Element';
import ElementWrapper from '../element/ElementWrapper';

function Constructor() {
	const order = useAppSelector((state: RootState) => state.burgerStructure);
	const dispatch = useAppDispatch();

	const amount = order.reduce((acc, { price }) => acc + price, 0);

	const handleSubmit = async () => {
		await dispatch(fetchOrder(order));
	};

	if (!order.length) {
		return <EmptyCart />;
	}

	return (
		<>
			<ElementWrapper>
				{order.map((item, index) => (
					<Element key={item.id} item={item} index={index} />
				))}
			</ElementWrapper>
			<Amount amount={amount} handleSubmit={handleSubmit} />
		</>
	);
}

export default Constructor;
