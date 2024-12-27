import { useAppDispatch, useAppSelector } from '@/hooks/useRTK';
import type { RootState } from '@/services/store';
import Modal from '@/molecules/modal/Modal';
import { closeModal } from '@/services/modal';
import Loader from '@/molecules/loader';
import OrderDetails from '@/molecules/order-details';

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
