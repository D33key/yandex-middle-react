import { useRef } from 'react';
import { useTab } from '../../hooks/useTab';
import Tabs from '../tab/Tab';
import Ingredients from './burger-components/Ingredients';
import cl from './BurgerIngredients.module.css';
import { CategoriesType } from './types';

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
			<Ingredients ref={root} setSections={setSections} />
		</div>
	);
}
