import { useAppDispatch, useAppSelector } from '../../../hooks/useRTK';
import { closeModal } from '../../../services/modal';
import { RootState } from '../../../services/store';
import Loader from '../../loader/Loader';
import Modal from '../Modal';
import OrderDetails from './OrderDetails';

function OrderModal() {
	const orderInfo = useAppSelector((state: RootState) => state.modalInfo);
	const dispatch = useAppDispatch();

	if (orderInfo && 'isLoading' in orderInfo) {
		return (
			<Modal
				onClose={() => dispatch(closeModal())}
				headerTitle='Отправляем запрос на заказ...'
			>
				<Loader.Wrapper>
					<Loader />
				</Loader.Wrapper>
			</Modal>
		);
	}

	return (
		orderInfo &&
		'order' in orderInfo && (
			<Modal onClose={() => dispatch(closeModal())}>
				<OrderDetails orderNumber={orderInfo.order.number} />
			</Modal>
		)
	);
}

export default OrderModal;
