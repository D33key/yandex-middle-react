import { Categories } from './BurgerIngredients';
import { CategoriesType } from './types';

export function transformData(data: CategoriesType[]) {
	return data.reduce<Categories>(
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
	);
}
