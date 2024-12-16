import {
	ConstructorElement as ConstructorElementYandex,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useAppDispatch } from '../../../hooks/useRTK';
import { removeIngredient } from '../../../services/burger-structure';
import { BurgerStructureState } from '../../../services/burger-structure/types';
import cl from './Element.module.css';
import { useDnD } from '../../../hooks/useDnD';

export interface ElementProps {
	item: BurgerStructureState;
	index: number;
}

function Element({ item, index }: ElementProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const dispatch = useAppDispatch();

	const { drag, drop } = useDnD({ index, itemId: item._id, ref });

	drag(drop(ref));

	return (
		<div ref={ref} className={cl.item}>
			{!item?.isLocked && <DragIcon type='primary' />}
			<ConstructorElementYandex
				type={item?.align as 'top' | 'bottom' | undefined}
				isLocked={item?.isLocked}
				text={item.name}
				price={item.price}
				thumbnail={item.image}
				handleClose={() => {
					dispatch(removeIngredient(item._id));
				}}
			/>
		</div>
	);
}

export default Element;
