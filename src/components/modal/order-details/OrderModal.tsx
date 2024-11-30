import { useAppDispatch, useAppSelector } from '../../../hooks/rtk';
import { closeModal } from '../../../services/modal';
import { RootState } from '../../../services/store';
import Modal from '../Modal';
import OrderDetails from './OrderDetails';

function OrderModal() {
	const orderInfo = useAppSelector((state: RootState) => state.modalInfo);
	const dispatch = useAppDispatch();

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
