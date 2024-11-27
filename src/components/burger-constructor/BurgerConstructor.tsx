import { useDrop } from 'react-dnd';
import OrderModal from '../modal/order-details/OrderModal';
import cl from './BurgerConstructor.module.css';
import ConstructorInfo from './ConstructorInfo';
import { DRAG_TYPE_INGREDIENT } from '../../constansts';
import { useAppDispatch } from '../../hooks/rtk';
import { addIngredient } from '../../services/burger-structure';
import { CategoriesType } from '../burger-ingredients/types';
import { updateAmount } from '../../services/ingredients';

function Wrapper({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();

	const [_, drop] = useDrop(
		() => ({
			accept: DRAG_TYPE_INGREDIENT,
			drop: (item: CategoriesType) => {
				dispatch(addIngredient(item));
			},
		}),
		[],
	);

	return (
		<div ref={drop} className={cl.wrapper}>
			{children}
		</div>
	);
}

function BurgerConstructor() {
	return (
		<BurgerConstructor.Wrapper>
			<ConstructorInfo />
			<OrderModal />
		</BurgerConstructor.Wrapper>
	);
}

BurgerConstructor.Wrapper = Wrapper;

export default BurgerConstructor;
