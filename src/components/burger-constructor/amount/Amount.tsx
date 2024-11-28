import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cl from './Amount.module.css';
import Typography from '../../ui/typography/Typography';

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
				<Typography type='digits' size='medium'>
					{amount}
				</Typography>
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
