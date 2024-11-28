import { forwardRef, memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtk';
import { fetchIngredients } from '../../../services/ingredients/asyncThunk';
import { RootState } from '../../../services/store';
import Loader from '../../loader/Loader';
import { tabs } from '../constants';
import { IngredientsProps } from '../types';
import Ingredient from './Ingredient';
import cl from './Ingredients.module.css';

const Ingredients = forwardRef<HTMLDivElement, IngredientsProps>(
	function Ingredients({ setSections }, ref) {
		const categories = useAppSelector((state: RootState) => state.ingredients);
		const dispatch = useAppDispatch();

		useEffect(() => {
			const promise = dispatch(fetchIngredients());
			return () => {
				promise.abort('Запрос отклонен');
			};
		}, []);

		if (!categories) {
			return <Loader />;
		}

		return (
			<div className={cl.ingredientsWrapper} ref={ref}>
				{tabs.map((tab) => (
					<Ingredient
						key={tab.id}
						data={categories[tab.id]}
						title={tab.title}
						section={tab.id}
						setSections={setSections}
					/>
				))}
			</div>
		);
	},
);

export default memo(Ingredients);
