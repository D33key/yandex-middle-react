import {
	ArrowDownIcon,
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk';
import { fetchOrder } from '../../services/modal/asyncThunk';
import { RootState } from '../../services/store';
import cl from './BurgerConstructor.module.css';
import Element from './Element';
import ElementWrapper from './ElementWrapper';

function ConstructorInfo() {
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
			<ElementWrapper>
				{order.map((item, index) => {
					return (
						<Element key={item._id + ' ' + index} item={item} index={index} />
					);
				})}
			</ElementWrapper>
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
