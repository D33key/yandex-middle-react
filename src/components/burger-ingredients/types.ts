import { SectionsRef } from '../../hooks/useTab';
import { TabName } from '../tab/types';

export interface CategoriesType {
	_id: string;
	name: string;
	type: 'bun' | 'main' | 'sauce';
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	amount?: number;
}

export interface IngredientsProps {
	setSections: React.Dispatch<React.SetStateAction<SectionsRef>>;
}

export interface IngredientWrapperProps {
	data: CategoriesType[];
	title: string;
	section: TabName;
	setSections: React.Dispatch<React.SetStateAction<SectionsRef>>;
}

export interface IngredientProps {
	product: CategoriesType;
}

export interface AmountProps {
	id: string;
	type: TabName;
}
