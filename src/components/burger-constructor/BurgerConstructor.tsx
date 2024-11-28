import { useDrop } from 'react-dnd';
import { DRAG_TYPE_INGREDIENT } from '../../constansts';
import { useAppDispatch } from '../../hooks/rtk';
import { addIngredient } from '../../services/burger-structure';
import { CategoriesType } from '../burger-ingredients/types';
import OrderModal from '../modal/order-details/OrderModal';
import cl from './BurgerConstructor.module.css';
import Constructor from './constructor/Constructor';

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
			<Constructor />
			<OrderModal />
		</BurgerConstructor.Wrapper>
	);
}

BurgerConstructor.Wrapper = Wrapper;

export default BurgerConstructor;
