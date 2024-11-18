import { useState } from 'react';
import Tabs from '../tab/Tab';
import { MOCKE_DATE } from './data';
import Ingredient from './burger-components/Ingredient';
import cl from './BurgerIngredients.module.css';

export default function BurgerIngredients() {
	const [categories, setCategories] = useState(() =>
		MOCKE_DATE.reduce(
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
		<div style={{ overflow: 'auto', flex: '1', maxHeight: '75dvh' }}>
			<Tabs />
			<div className={cl.wrapper}>
				<Ingredient data={categories.bun} title='Булки' />
				<Ingredient data={categories.sauce} title='Соусы' />
				<Ingredient data={categories.main} title='Начинки' />
			</div>
		</div>
	);
}
