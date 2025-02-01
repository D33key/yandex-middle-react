import Typography from '@/atoms/typography/Typography';
import { ArrowDownIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function EmptyCart({ text = 'Перетащите ингредиент сюда' }: { text?: string }) {
	return (
		<div className='flex items-center self-center'>
			<Typography type='main' size='medium'>
				{text}
			</Typography>
			<ArrowDownIcon type='primary' />
		</div>
	);
}

export default EmptyCart;
