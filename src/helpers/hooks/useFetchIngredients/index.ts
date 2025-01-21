import { useEffect } from 'react';
import { useAppDispatch } from '../useRTK';
import { fetchIngredients } from '@/services/ingredients/asyncThunk';

export function useFetchIngredients() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const promise = dispatch(fetchIngredients());

		return () => {
			promise.abort('Запрос отклонен');
		};
	}, []);
}
