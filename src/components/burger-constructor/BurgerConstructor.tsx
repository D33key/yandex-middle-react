import {
	ArrowDownIcon,
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks/rtk';
import { RootState } from '../../services/store';
import Modal from '../modal/Modal';
import OrderDetails from '../modal/order-details/OrderDetails';
import cl from './BurgerConstructor.module.css';

export default function BurgerConstructor() {
	const order = useAppSelector((state: RootState) => state.burgerStructure);
	const [showPopup, setShowPopup] = useState(false);

	const amount = useMemo(
		() => order.reduce((acc, { price }) => acc + price, 0),
		[order],
	);
	return (
		<div className={cl.wrapper}>
			{order.length > 0 ? (
				<>
					<div className={cl.constructorElements}>
						{order.map((item, index) => {
							const isDraggable = !item?.isLocked;
							return (
								<div className={cl.item} key={index}>
									{isDraggable && <DragIcon type='primary' />}
									<ConstructorElement
										type={item?.align as 'top' | 'bottom' | undefined}
										isLocked={item?.isLocked}
										text={item.name}
										price={item.price}
										thumbnail={item.image}
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
				</>
			) : (
				<div className='flex items-center self-center'>
					<p className='text text_type_main-medium'>
						Перетащите ингредиент сюда
					</p>
					<ArrowDownIcon type='primary' />
				</div>
			)}
			{showPopup && (
				<Modal onClose={() => setShowPopup(false)}>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
}
