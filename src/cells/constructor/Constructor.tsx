import useAuth from '@/helpers/hooks/useAuth/useAuth';
import { useAppDispatch, useAppSelector } from '@/helpers/hooks/useRTK';
import Element from '@/molecules/constructor-element/Constructor';
import EmptyCart from '@/molecules/empty-cart';
import PriceWithButton from '@/molecules/price-with-button/PriceWithButton';
import { clearCart } from '@/services/burger-structure';
import { fetchOrder } from '@/services/modal/asyncThunk';
import type { RootState } from '@/services/store';
import { useNavigate } from 'react-router';

function Constructor() {
	const { isUserExist } = useAuth();
	const navigate = useNavigate();
	const order = useAppSelector((state: RootState) => state.burgerStructure);
	const dispatch = useAppDispatch();

	const amount = order.reduce((acc, { price }) => acc + price, 0);

	const handleSubmit = async () => {
		if (isUserExist) {
			await dispatch(fetchOrder(order));
			dispatch(clearCart());
		} else {
			navigate('/login');
		}
	};

	if (!order.length) {
		return <EmptyCart />;
	}

	return (
		<>
			<Element.Wrapper>
				{order.map((item, index) => (
					<Element key={item.id} item={item} index={index} />
				))}
			</Element.Wrapper>
			<PriceWithButton amount={amount} handleSubmit={handleSubmit} />
		</>
	);
}

export default Constructor;
