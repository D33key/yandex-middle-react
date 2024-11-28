import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { DRAG_TYPE_INGREDIENT } from '../../../constansts';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtk';
import { openModal } from '../../../services/modal';
import { RootState } from '../../../services/store';
import Subtitle from '../../ui/heading/Subtitle';
import { AmountProps, IngredientProps, IngredientWrapperProps } from '../types';
import cl from './Ingredient.module.css';

export default function IngredientWrapper({
	data,
	title,
	section,
	setSections,
}: IngredientWrapperProps) {
	return (
		<div
			className={cl.wrapper}
			data-section={section}
			ref={(el) => {
				setSections((prev) => ({ ...prev, [section]: el }));
			}}
		>
			<Subtitle>{title}</Subtitle>
			<div className={cl.productsArrayWrapper}>
				{data.map((product) => (
					<Ingredient key={product._id} product={product} />
				))}
			</div>
		</div>
	);
}

function Ingredient({ product }: IngredientProps) {
	const [_, drag] = useDrag(() => ({
		type: DRAG_TYPE_INGREDIENT,
		item: product,
	}));
	const dispatch = useAppDispatch();

	const handleProductClick = (product: IngredientProps['product']) => {
		dispatch(openModal(product));
	};
	return (
		<div
			className={cl.productWrapper}
			onClick={() => handleProductClick(product)}
			ref={drag}
		>
			<div className={cl.img}>
				<img src={product.image} alt={product.name} />
				<Amount id={product._id} type={product.type} />
			</div>
			<p className={`text text_type_digits-default ${cl.price}`}>
				{product.price} <CurrencyIcon type='primary' />
			</p>
			<p className='text text_type_main-default'>{product.name}</p>
		</div>
	);
}

function Amount({ id, type }: AmountProps) {
	const order = useAppSelector((state: RootState) => state.burgerStructure);

	const amount = useMemo(() => {
		return type === 'bun'
			? order.filter((item) => item._id === id).length - 1
			: order.filter((item) => item._id === id).length;
	}, [order]);

	return (
		amount > 0 && <Counter count={amount} size='default' extraClass='m-1' />
	);
}
