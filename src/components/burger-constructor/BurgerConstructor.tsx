import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import { MOCK_ORDER } from '../../constansts';
import cl from './BurgerConstructor.module.css';

export default function BurgerConstructor() {
	const [order, setOrder] = useState(MOCK_ORDER);
	const amount = useMemo(
		() => order.reduce((acc, { price }) => acc + price, 0),
		[order],
	);
	return (
		<div className={cl.wrapper}>
			{order.map((item, index) => {
				const isDraggable = !item?.isLocked;
				return (
					<div className={cl.item} key={index}>
						{isDraggable && <DragIcon type='primary' />}
						<ConstructorElement
							type={item?.type as any}
							isLocked={item?.isLocked}
							text={item.name}
							price={item.price}
							thumbnail={item.img}
						/>
					</div>
				);
			})}
			<div className={cl.amountWrapper}>
				<div className={cl.amount}>
					<p className='text text_type_digits-medium'>{amount}</p>
					<CurrencyIcon type='primary' />
				</div>
				<Button htmlType='submit' type='primary' size='medium'>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
}
