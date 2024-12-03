import { CategoriesType } from '../../components/burger-ingredients/types';

export type BurgerStructureState = CategoriesType & {
	isLocked?: boolean;
	align?: 'top' | 'bottom';
	id?: string;
	secondBunId?: string;
};
