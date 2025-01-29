import IngredientCircle from '@/atoms/ingredient-circle';

type Props = { ingredients: string[] };

function IngredientCircleList({ ingredients }: Props) {
	return (
		<div className='flex'>
			{ingredients.length > 6
				? ingredients
						.slice(0, 6)
						.map((ingredient, index) => (
							<IngredientCircle
								key={index}
								img={ingredient}
								isLast={index === 5}
								amountOfRemainingIngredients={ingredients.length - 6}
							/>
						))
				: ingredients.map((ingredient, index) => (
						<IngredientCircle key={index} img={ingredient} />
				  ))}
		</div>
	);
}

export default IngredientCircleList;
