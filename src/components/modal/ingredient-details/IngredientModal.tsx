import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRTK';
import { RootState } from '../../../services/store';
import Modal from '../Modal';
import IngredientDetails from './IngredientDetails';
import { closeModal } from '../../../services/modal';

function IngredientModal() {
	const selectedProduct = useAppSelector((state: RootState) => state.modalInfo);
	const dispatch = useAppDispatch();

	return (
		<IngredientModal.Wrapper>
			{selectedProduct && 'type' in selectedProduct && (
				<Modal
					headerTitle='Детали ингредиента'
					onClose={() => dispatch(closeModal())}
				>
					<IngredientDetails product={selectedProduct} />
				</Modal>
			)}
		</IngredientModal.Wrapper>
	);
}

function Wrapper({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}

IngredientModal.Wrapper = Wrapper;

export default memo(IngredientModal);
