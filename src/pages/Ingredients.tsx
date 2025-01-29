import { useParams } from 'react-router';
import IngredientDetails from '../molecules/ingredient-details/IngredientDetails';
import Main from '../atoms/main/Main';
import { useFetchIngredient } from '@/helpers/hooks/useFetchIngredient';

export default function Ingredients() {
	const params = useParams();

	const ingredient = useFetchIngredient(params.id ?? '');

	return (
		ingredient && (
			<Main className='m-top-120'>
				<IngredientDetails product={ingredient} />
			</Main>
		)
	);
}
