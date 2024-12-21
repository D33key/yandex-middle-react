import { memo, SetStateAction } from 'react';
import { useFetchIngredients } from '../../../hooks/useFetchIngredients';
import { useAppSelector } from '../../../hooks/useRTK';
import { SectionsRef } from '../../../hooks/useTab';
import { RootState } from '../../../services/store';
import Loader from '../../loader/Loader';
import { TABS } from '../constants';
import Ingredient from './Ingredient';
import cl from './Ingredients.module.css';

function Ingredients({
	setSections,
	ref,
}: {
	setSections: React.Dispatch<SetStateAction<SectionsRef>>;
	ref: React.RefObject<HTMLDivElement | null>;
}) {
	const categories = useAppSelector((state: RootState) => state.ingredients);

	return (
		<Ingredients.Wrapper ref={ref}>
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
		</Ingredients.Wrapper>
	);
}

function Wrapper({
	children,
	ref,
}: {
	children: React.ReactNode;
	ref: React.RefObject<HTMLDivElement | null>;
}) {
	useFetchIngredients();
	return (
		<div className={cl.ingredientsWrapper} ref={ref}>
			{children}
		</div>
	);
}

Ingredients.Wrapper = Wrapper;

export default memo(Ingredients);
