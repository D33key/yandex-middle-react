import { useEffect, useState } from 'react';
import Tabs from '../tab/Tab';
import Ingredient from './burger-components/Ingredient';
import cl from './BurgerIngredients.module.css';
import { CategoriesType } from './types';
import { transformData } from './utils';

export interface Categories {
	bun: CategoriesType[];
	main: CategoriesType[];
	sauce: CategoriesType[];
}

export default function BurgerIngredients() {
	const [categories, setCategories] = useState<Categories | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		const fetchCategories = async () => {
			try {
				const response = await fetch(
					'https://norma.nomoreparties.space/api/ingredients',
					{ signal: controller.signal },
				);

				if (!response.ok) {
					return Promise.reject(`Ошибка ${response.status}`);
				}

				const data = await response.json();

				const transformedData = transformData(data.data);

				setCategories(transformedData);
			} catch (error) {
				console.error(error);
			}
		};

		fetchCategories();

		return () => {
			controller.abort('Unmount');
		};
	}, []);

	return (
		<div className={cl.wrapper}>
			<Tabs />
			{categories && (
				<div>
					<Ingredient data={categories.bun} title='Булки' />
					<Ingredient data={categories.sauce} title='Соусы' />
					<Ingredient data={categories.main} title='Начинки' />
				</div>
			)}
		</div>
	);
}
