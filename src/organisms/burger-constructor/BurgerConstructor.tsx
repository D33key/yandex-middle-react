import { useDrop } from 'react-dnd';
import cl from './BurgerConstructor.module.css';
import { useAppDispatch } from '@/hooks/useRTK';
import { DRAG_TYPE_INGREDIENT } from '@/constansts';
import type { CategoriesType } from '@/types/burger-structure';
import { addIngredient } from '@/services/burger-structure';
import Constructor from '@/cells/constructor/Constructor';
import OrderModal from '@/cells/order-modal';

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
		<div
			ref={(el) => {
				drop(el);
			}}
			className={cl.wrapper}
		>
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
