import { InfoProps } from './IngredientInfo';

interface IngredientInfo {
	title: string;
	type: keyof InfoProps;
}

export const INGREDIENT_INFO: IngredientInfo[] = [
	{
		title: 'Калории,ккал',
		type: 'calories',
	},
	{
		title: 'Белки, г',
		type: 'proteins',
	},
	{
		title: 'Жиры, г',
		type: 'fat',
	},
	{
		title: 'Углеводы, г',
		type: 'carbohydrates',
	},
];
