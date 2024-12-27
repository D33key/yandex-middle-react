import { useRef } from 'react';
import cl from './BurgerStructure.module.css';
import IngredientsList from '../ingredients-list/IngredientsList';
import Tabs from '@/molecules/tab/Tab';
import { useTab } from '@/hooks/useTab';
import type { CategoriesType } from '@/types/burger-structure';

export interface Categories {
	bun: CategoriesType[];
	main: CategoriesType[];
	sauce: CategoriesType[];
}

export default function BurgerIngredients() {
	const root = useRef<HTMLDivElement | null>(null);
	const [setSections, currentTab, setCurrentTab] = useTab({ root });

	return (
		<div className={cl.wrapper}>
			<Tabs current={currentTab} setCurrent={setCurrentTab} />
			<IngredientsList ref={root} setSections={setSections} />
		</div>
	);
}
