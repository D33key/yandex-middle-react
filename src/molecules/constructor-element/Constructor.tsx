import {
	ConstructorElement as ConstructorElementYandex,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import cl from './Element.module.css';
import type { BurgerStructureState } from '@/services/burger-structure/types';
import { removeIngredient } from '@/services/burger-structure';
import { useAppDispatch } from '@/helpers/hooks/useRTK';
import { useDnD } from '@/helpers/hooks/useDnD';

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

function Wrapper({ children }: { children: React.ReactNode }) {
	return <div className={cl.constructorElements}>{children}</div>;
}

Element.Wrapper = Wrapper;

export default Element;
