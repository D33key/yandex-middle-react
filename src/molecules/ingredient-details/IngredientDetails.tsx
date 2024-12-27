import Typography from '@/atoms/typography/Typography';
import cl from './IngredientDetails.module.css';
import IngredientInfo from '@/atoms/ingredient-info/IngredientInfo';
import { IngredientProps } from '@/types/burger-structure';

export default function IngredientDetails({ product }: IngredientProps) {
	return (
		<div className='flex flex-col items-center'>
			<img src={product.image_large} alt={product.name} />
			<Typography size='medium' extraClass={cl.name}>
				{product.name}
			</Typography>
			<IngredientInfo
				calories={product.calories}
				carbohydrates={product.carbohydrates}
				fat={product.fat}
				proteins={product.proteins}
			/>
		</div>
	);
}
