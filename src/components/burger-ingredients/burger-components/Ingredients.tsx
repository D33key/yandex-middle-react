import { forwardRef, memo } from 'react';
import { useAppSelector } from '../../../hooks/useRTK';
import { RootState } from '../../../services/store';
import Loader from '../../loader/Loader';
import { TABS } from '../constants';
import { useFetchIngredients } from '../../../hooks/useFetchIngredients';
import { IngredientsProps } from '../types';
import Ingredient from './Ingredient';
import cl from './Ingredients.module.css';

const Ingredients = forwardRef<HTMLDivElement, IngredientsProps>(
	function Ingredients({ setSections }, ref) {
		const categories = useAppSelector((state: RootState) => state.ingredients);

		useFetchIngredients();

		return (
			<div className={cl.ingredientsWrapper} ref={ref}>
				{categories ? (
					TABS.map((tab) => (
						<Ingredient
							key={tab.id}
							data={categories[tab.id]}
							title={tab.title}
							section={tab.id}
							setSections={setSections}
						/>
					))
				) : (
					<Loader />
				)}
			</div>
		);
	},
);

export default memo(Ingredients);
