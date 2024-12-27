import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router';
import cl from './Ingredient.module.css';
import {
	IngredientProps,
	IngredientWrapperProps,
} from '@/types/burger-structure';
import Title from '@/atoms/heading/Title';
import { DRAG_TYPE_INGREDIENT } from '@/constansts';
import { useAppDispatch } from '@/hooks/useRTK';
import { openModal } from '@/services/modal';
import Amount from '@/atoms/ingredient-amount/Amount';
import Typography from '@/atoms/typography/Typography';

export default function IngredientWithTitle({
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
			<Title as='h2'>{title}</Title>
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
	const location = useLocation();

	const handleProductClick = (product: IngredientProps['product']) => {
		dispatch(openModal(product));
	};
	return (
		<Link
			ref={(el) => {
				drag(el);
			}}
			to={`/ingredients/${product._id}`}
			className={cl.productWrapper}
			onClick={() => handleProductClick(product)}
			state={{ background: location }}
			replace
		>
			<div className={cl.img}>
				<img src={product.image} alt={product.name} />
				<Amount id={product._id} type={product.type} />
			</div>
			<Typography type='digits' extraClass={cl.price}>
				{product.price} <CurrencyIcon type='primary' />
			</Typography>
			<Typography>{product.name}</Typography>
		</Link>
	);
}
