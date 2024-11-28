import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cl from './Amount.module.css';

export default function Amount({
	amount,
	handleSubmit,
}: {
	amount: number;
	handleSubmit: () => Promise<void>;
}) {
	return (
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
	);
}
