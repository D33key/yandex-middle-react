import { useDrag, useDrop, XYCoord } from 'react-dnd';
import type { TabName } from '@/types/Tab';
import { useAppDispatch } from '../useRTK';
import { DRAG_TYPE_ITEM } from '@/constansts';
import { moveIngredient } from '@/services/burger-structure';

interface UseDnDProps {
	index: number;
	itemId: string;
	ref: React.RefObject<HTMLDivElement | null>;
}

export function useDnD({ index, itemId, ref }: UseDnDProps) {
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
			id: itemId,
		}),
	}));

	return { drop, drag };
}
