import type { IngredientRowProps } from '@/molecules/ingredient-row';
import type { FeedInfo } from '@/services/modal/type';

export default function transformIngredientsWithCount(
	ingredients: FeedInfo['ingredients'],
) {
	return Object.values(
		ingredients.reduce((acc, item) => {
			if (!acc[item.name]) {
				acc[item.name] = { ...item, count: 1 };
			} else {
				acc[item.name].count += 1;
			}
			return acc;
		}, {} as Record<string, IngredientRowProps>),
	);
}
