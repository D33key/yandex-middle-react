import { useAppDispatch, useAppSelector } from '../../../hooks/rtk';
import { closeModal } from '../../../services/modal';
import { OrderInfo } from '../../../services/modal/type';
import { RootState } from '../../../services/store';
import Modal from '../Modal';
import OrderDetails from './OrderDetails';

function OrderModal() {
	const orderInfo = useAppSelector((state: RootState) => state.modalInfo);
	const dispatch = useAppDispatch();

	return (
		(orderInfo as OrderInfo)?.order && (
			<Modal onClose={() => dispatch(closeModal())}>
				<OrderDetails orderNumber={(orderInfo as OrderInfo).order.number} />
			</Modal>
		)
	);
}

export default OrderModal;
