import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import { MOCK_ORDER } from '../../constansts';
import Modal from '../modal/Modal';
import OrderDetails from '../modal/order-details/OrderDetails';
import cl from './BurgerConstructor.module.css';

export default function BurgerConstructor() {
	const [order] = useState(MOCK_ORDER);
	const [showPopup, setShowPopup] = useState(false);

	const amount = useMemo(
		() => order.reduce((acc, { price }) => acc + price, 0),
		[order],
	);
	return (
		<div className={cl.wrapper}>
			<div className={cl.constructorElements}>
				{order.map((item, index) => {
					const isDraggable = !item?.isLocked;
					return (
						<div className={cl.item} key={index}>
							{isDraggable && <DragIcon type='primary' />}
							<ConstructorElement
								type={item?.type as 'top' | 'bottom' | undefined}
								isLocked={item?.isLocked}
								text={item.name}
								price={item.price}
								thumbnail={item.img}
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
					onClick={() => setShowPopup(true)}
				>
					Оформить заказ
				</Button>
			</div>
			{showPopup && (
				<Modal onClose={() => setShowPopup(false)}>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
}
