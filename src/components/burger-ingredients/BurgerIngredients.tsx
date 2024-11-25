import { useState } from 'react';
import Tabs from '../tab/Tab';
import { MOCKE_DATE, MockeData } from './data';
import Ingredient from './burger-components/Ingredient';
import cl from './BurgerIngredients.module.css';

interface Categories {
	bun: MockeData[];
	main: MockeData[];
	sauce: MockeData[];
}

export default function BurgerIngredients() {
	const [categories] = useState(() =>
		MOCKE_DATE.reduce<Categories>(
			(acc, product) => {
				if (product.type === 'bun') {
					acc.bun.push(product);
				} else if (product.type === 'main') {
					acc.main.push(product);
				} else if (product.type === 'sauce') {
					acc.sauce.push(product);
				}
				return acc;
			},
			{ bun: [], main: [], sauce: [] },
		),
	);

	return (
		<div className={cl.wrapper}>
			<Tabs />
			<div>
				<Ingredient data={categories.bun} title='Булки' />
				<Ingredient data={categories.sauce} title='Соусы' />
				<Ingredient data={categories.main} title='Начинки' />
			</div>
		</div>
	);
}
