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
			const response = await fetch(
				'https://norma.nomoreparties.space/api/ingredients',
				{ signal: controller.signal },
			);

			if (!response.ok) {
				return;
			}

			const data = await response.json();
			console.log(data.data)

			const transformedData = transformData(data.data);

			setCategories(transformedData);
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
