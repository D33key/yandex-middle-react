import { useEffect, useState } from 'react';
import { fetchIngredient } from '../../services/ingredients/asyncThunk';
import { useAppDispatch } from '../useRTK';
import { CategoriesType } from '../../components/burger-ingredients/types';

export function useFetchIngredient(id: string) {
	const dispatch = useAppDispatch();
	const [ingredient, setIngredient] = useState<CategoriesType | null>(null);

	useEffect(() => {
		const promise = dispatch(fetchIngredient(id));

		promise.then((res) => {
			if (res.payload) setIngredient(res.payload as CategoriesType);
		});

		return () => {
			promise.abort('Запрос отклонен');
		};
	}, []);

	return ingredient;
}
