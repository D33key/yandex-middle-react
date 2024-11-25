import { CategoriesType } from '../../burger-ingredients/types';
import ProductInfo from './IngredientInfo';
import cl from './IngredientDetails.module.css';

export default function IngredientDetails({
	product,
}: {
	product: CategoriesType;
}) {
	return (
		<div className='flex flex-col items-center'>
			<img src={product.image_large} alt={product.name} />
			<p className={`text text_type_main-medium ${cl.name}`}>{product.name}</p>
			<ProductInfo
				calories={product.calories}
				carbohydrates={product.carbohydrates}
				fat={product.fat}
				proteins={product.proteins}
			/>
		</div>
	);
}
