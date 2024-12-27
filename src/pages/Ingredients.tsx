import { useParams } from 'react-router';
import { useFetchIngredient } from '../hooks/useFetchIngredient';
import IngredientDetails from '../molecules/ingredient-details/IngredientDetails';
import Main from '../atoms/main/Main';

export default function Ingredients() {
	const params = useParams();

	const ingredient = useFetchIngredient(params.id ?? '');
	console.log(ingredient);

	return (
		ingredient && (
			<Main className='m-top-120'>
				<IngredientDetails product={ingredient} />
			</Main>
		)
	);
}
