import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cl from './PriceWithButton.module.css';
import Typography from '@/atoms/typography/Typography';
import Button from '@/atoms/button';

interface PriceWithButtonProps {
	amount: number;
	handleSubmit: () => Promise<void>;
}

export default function PriceWithButton({
	amount,
	handleSubmit,
}: PriceWithButtonProps) {
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
