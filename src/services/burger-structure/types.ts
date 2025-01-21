import { CategoriesType } from '../../types/burger-structure';

export type BurgerStructureState = CategoriesType & {
	isLocked?: boolean;
	align?: 'top' | 'bottom';
	id?: string;
	secondBunId?: string;
};
