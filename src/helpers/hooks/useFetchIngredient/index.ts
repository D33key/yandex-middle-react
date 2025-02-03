import { useEffect, useState } from 'react';
import { useAppDispatch } from '../useRTK';
import type { CategoriesType } from '@/types/burger-structure';
import { fetchIngredient } from '@/services/ingredients/asyncThunk';

export function useFetchIngredient(id: string) {
	const dispatch = useAppDispatch();
	const [ingredient, setIngredient] = useState<CategoriesType | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const promise = dispatch(fetchIngredient(id));

		promise
			.then((res) => {
				if (res.payload) {
					setIngredient(res.payload as CategoriesType);
				}
			})
			.finally(() => setIsLoading(false));

		return () => {
			promise.abort('Запрос отклонен');
		};
	}, []);

	return { isLoading, ingredient };
}
