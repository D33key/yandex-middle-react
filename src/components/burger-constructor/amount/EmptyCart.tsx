import { ArrowDownIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function EmptyCart() {
	return (
		<div className='flex items-center self-center'>
			<p className='text text_type_main-medium'>Перетащите ингредиент сюда</p>
			<ArrowDownIcon type='primary' />
		</div>
	);
}

export default EmptyCart;
