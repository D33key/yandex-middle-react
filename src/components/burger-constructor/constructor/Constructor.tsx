import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtk';
import { fetchOrder } from '../../../services/modal/asyncThunk';
import { RootState } from '../../../services/store';
import Amount from '../amount/Amount';
import EmptyCart from '../amount/EmptyCart';
import Element from '../element/Element';
import ElementWrapper from '../element/ElementWrapper';

function Constructor() {
	const order = useAppSelector((state: RootState) => state.burgerStructure);
	const dispatch = useAppDispatch();

	const amount = useMemo(
		() => order.reduce((acc, { price }) => acc + price, 0),
		[order],
	);

	const handleSubmit = async () => {
		await dispatch(fetchOrder(order));
	};

	if (order.length === 0) {
		return <Constructor.EmptyCart />;
	}

	return (
		<>
			<Constructor.ElementWrapper>
				{order.map((item, index) => {
					return (
						<Constructor.Element
							key={item._id + ' ' + index}
							item={item}
							index={index}
						/>
					);
				})}
			</Constructor.ElementWrapper>
			<Constructor.Amount amount={amount} handleSubmit={handleSubmit} />
		</>
	);
}

Constructor.ElementWrapper = ElementWrapper;
Constructor.Element = Element;
Constructor.Amount = Amount;
Constructor.EmptyCart = EmptyCart;

export default Constructor;
