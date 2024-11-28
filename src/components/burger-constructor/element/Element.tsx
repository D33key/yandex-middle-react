import {
	ConstructorElement as ConstructorElementYandex,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { DRAG_TYPE_ITEM } from '../../../constansts';
import { useAppDispatch } from '../../../hooks/rtk';
import {
	moveIngredient,
	removeIngredient,
} from '../../../services/burger-structure';
import { BurgerStructureState } from '../../../services/burger-structure/types';
import { TabName } from '../../tab/types';
import cl from './Element.module.css';

function Element({
	item,
	index,
}: {
	item: BurgerStructureState;
	index: number;
}) {
	const ref = useRef<HTMLDivElement | null>(null);
	const dispatch = useAppDispatch();

	const [_, drop] = useDrop(
		() => ({
			accept: DRAG_TYPE_ITEM,
			hover(item: { index: number; type: TabName }, monitor) {
				const dragIndex = item.index;
				const hoverIndex = index;

				if (dragIndex === hoverIndex) {
					return;
				}

				const hoverBoundingRect = ref.current?.getBoundingClientRect();

				if (hoverBoundingRect) {
					const hoverMiddleY =
						(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

					const clientOffset = monitor.getClientOffset();

					const hoverClientY =
						(clientOffset as XYCoord).y - hoverBoundingRect.top;

					if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
						return;
					}

					if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
						return;
					}

					dispatch(moveIngredient({ dragIndex, hoverIndex }));

					item.index = hoverIndex;
				}
			},
		}),
		[],
	);
	const [__, drag] = useDrag(() => ({
		type: DRAG_TYPE_ITEM,
		item: () => ({
			index,
			id: item._id,
		}),
	}));

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
