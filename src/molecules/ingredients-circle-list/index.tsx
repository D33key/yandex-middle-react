import IngredientCircle from '@/atoms/ingredient-circle';
import type { FeedInfo } from '@/services/modal/type';

function IngredientCircleList({
	ingredients,
}: {
	ingredients: FeedInfo['ingredients'];
}) {
	return (
		<div className='flex'>
			{ingredients.length > 6
				? ingredients
						.slice(0, 6)
						.map((ingredient, index) => (
							<IngredientCircle
								key={index}
								img={ingredient.img}
								isLast={index === 5}
								amountOfRemainingIngredients={ingredients.length - 6}
							/>
						))
				: ingredients.map((ingredient, index) => (
						<IngredientCircle key={index} img={ingredient.img} />
				  ))}
		</div>
	);
}

export default IngredientCircleList;
