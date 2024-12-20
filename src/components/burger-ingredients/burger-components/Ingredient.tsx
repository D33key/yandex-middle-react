import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { DRAG_TYPE_INGREDIENT } from '../../../constansts';
import { useAppDispatch } from '../../../hooks/useRTK';
import { openModal } from '../../../services/modal';
import Subtitle from '../../ui/heading/Subtitle';
import Typography from '../../ui/typography/Typography';
import { IngredientProps, IngredientWrapperProps } from '../types';
import Amount from './Amount';
import cl from './Ingredient.module.css';
import { Link, useLocation } from 'react-router';

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
	const location = useLocation();

	const handleProductClick = (product: IngredientProps['product']) => {
		dispatch(openModal(product));
	};
	return (
		<Link
			ref={drag}
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
