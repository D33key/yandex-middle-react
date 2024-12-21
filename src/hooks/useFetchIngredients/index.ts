import { useEffect } from 'react';
import { fetchIngredients } from '../../services/ingredients/asyncThunk';
import { useAppDispatch } from '../useRTK';

export function useFetchIngredients() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const promise = dispatch(fetchIngredients());
		return () => {
			promise.abort('Запрос отклонен');
		};
	}, []);
}
