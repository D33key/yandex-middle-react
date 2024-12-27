import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRTK';
import IngredientDetails from '@/molecules/ingredient-details/IngredientDetails';
import Modal from '@/molecules/modal/Modal';
import { closeModal } from '@/services/modal';
import type { RootState } from '@/services/store';

function IngredientModal() {
	const selectedProduct = useAppSelector((state: RootState) => state.modalInfo);
	const dispatch = useAppDispatch();

	return (
		selectedProduct &&
		'type' in selectedProduct && (
			<Modal
				headerTitle='Детали ингредиента'
				onClose={() => dispatch(closeModal())}
			>
				<IngredientDetails product={selectedProduct} />
			</Modal>
		)
	);
}

export default memo(IngredientModal);
