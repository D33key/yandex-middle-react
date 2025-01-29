import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Typography from '../typography/Typography';
import cl from './Price.module.css';

type Props = { amount: number; size?: 'default' | 'medium' };

export default function Price({ amount, size = 'medium' }: Props) {
	return (
		<div className={cl.amount}>
			<Typography type='digits' size={size}>
				{amount}
			</Typography>
			<CurrencyIcon type='primary' />
		</div>
	);
}
