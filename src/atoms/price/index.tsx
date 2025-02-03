import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Typography from '../typography/Typography';
import cl from './Price.module.css';

type Props = {
	amount: number;
	size?: 'default' | 'medium';
	withCount?: number;
	extraClass?: string;
};

export default function Price({
	amount,
	size = 'medium',
	withCount,
	extraClass = '',
}: Props) {
	return (
		<div className={`${cl.amount} ${extraClass}`}>
			<Typography type='digits' size={size}>
				{withCount && `${withCount} x `}
				{amount}
			</Typography>
			<CurrencyIcon type='primary' />
		</div>
	);
}
