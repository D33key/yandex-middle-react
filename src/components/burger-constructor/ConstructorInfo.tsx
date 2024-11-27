import {
	ArrowDownIcon,
	Button,
	ConstructorElement as ConstructorElementYandex,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DRAG_TYPE_ITEM } from '../../constansts';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk';
import { removeIngredient } from '../../services/burger-structure';
import { fetchOrder } from '../../services/modal/asyncThunk';
import { RootState } from '../../services/store';
import cl from './BurgerConstructor.module.css';

function ConstructorInfo() {
	const [_, drop] = useDrop(
		() => ({
			accept: DRAG_TYPE_ITEM,
		}),
		[],
	);

	const [__, drag] = useDrag(() => ({
		type: DRAG_TYPE_ITEM,
	}));

	const order = useAppSelector((state: RootState) => state.burgerStructure);
	const dispatch = useAppDispatch();

	const amount = useMemo(
		() => order.reduce((acc, { price }) => acc + price, 0),
		[order],
	);

	const handleSubmit = async () => {
		await dispatch(fetchOrder(order));
	};

	return order.length > 0 ? (
		<>
			<div ref={drop} className={cl.constructorElements}>
				{order.map((item, index) => {
					const isDraggable = !item?.isLocked;
					return (
						<div ref={drag} className={cl.item} key={index}>
							{isDraggable && <DragIcon type='primary' />}
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
				})}
			</div>
			<div className={cl.amountWrapper}>
				<div className={cl.amount}>
					<p className='text text_type_digits-medium'>{amount}</p>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					onClick={handleSubmit}
				>
					Оформить заказ
				</Button>
			</div>
		</>
	) : (
		<div className='flex items-center self-center'>
			<p className='text text_type_main-medium'>Перетащите ингредиент сюда</p>
			<ArrowDownIcon type='primary' />
		</div>
	);
}

export default ConstructorInfo;
