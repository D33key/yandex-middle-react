import { useParams } from 'react-router';
import IngredientDetails from '../molecules/ingredient-details/IngredientDetails';
import Main from '../atoms/main/Main';
import { useFetchIngredient } from '@/helpers/hooks/useFetchIngredient';
import Loader from '@/molecules/loader';

export default function Ingredients() {
	const params = useParams();

	const { ingredient, isLoading } = useFetchIngredient(params.id ?? '');

	return (
		ingredient && (
			<Main className='m-top-120'>
				{isLoading && <Loader />}
				{ingredient && <IngredientDetails product={ingredient} />}
			</Main>
		)
	);
}
