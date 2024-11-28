import { ArrowDownIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Typography from '../../ui/typography/Typography';

function EmptyCart() {
	return (
		<div className='flex items-center self-center'>
			<Typography type='main' size='medium'>
				Перетащите ингредиент сюда
			</Typography>
			<ArrowDownIcon type='primary' />
		</div>
	);
}

export default EmptyCart;
