import { IngredientProps } from '../../burger-ingredients/types';
import Typography from '../../ui/typography/Typography';
import cl from './IngredientDetails.module.css';
import ProductInfo from './IngredientInfo';

export default function IngredientDetails({ product }: IngredientProps) {
	return (
		<div className='flex flex-col items-center'>
			<img src={product.image_large} alt={product.name} />
			<Typography size='medium' extraClass={cl.name}>
				{product.name}
			</Typography>
			<ProductInfo
				calories={product.calories}
				carbohydrates={product.carbohydrates}
				fat={product.fat}
				proteins={product.proteins}
			/>
		</div>
	);
}
