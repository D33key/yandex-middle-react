import Button from '@/atoms/button';
import Price from '@/atoms/price';
import cl from './PriceWithButton.module.css';

interface PriceWithButtonProps {
	amount: number;
	handleSubmit: () => Promise<void>;
}

export default function PriceWithButton({
	amount,
	handleSubmit,
}: PriceWithButtonProps) {
	return (
		<div className={cl.amountWrapper} data-type='submitButton'>
			<Price amount={amount} />
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
