import { forwardRef, memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtk';
import { RootState } from '../../../services/store';
import { fetchIngredients } from '../../../services/ingredients/asyncThunk';
import Ingredient from './Ingredient';
import cl from './Ingredients.module.css';
import { tabs } from '../constants';
import { SectionsRef } from '../../../hooks/useTab/useTab';

const Ingredients = forwardRef(function Ingredients(
	{
		setSections,
	}: {
		setSections: React.Dispatch<React.SetStateAction<SectionsRef>>;
	},
	ref: React.ForwardedRef<HTMLDivElement | null>,
) {
	const categories = useAppSelector((state: RootState) => state.ingredients);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const promise = dispatch(fetchIngredients());
		return () => {
			promise.abort('Запрос отклонен');
		};
	}, []);

	return (
		categories && (
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
		)
	);
});

export default memo(Ingredients);
