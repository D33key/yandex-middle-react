import { memo, SetStateAction } from 'react';
import cl from './Ingredients.module.css';
import { useAppSelector } from '@/hooks/useRTK';
import { SectionsRef } from '@/hooks/useTab';
import type { RootState } from '@/services/store';
import Loader from '@/molecules/loader';
import { useFetchIngredients } from '@/hooks/useFetchIngredients';
import IngredientWithTitle from '@/molecules/ingredient-with-title/IngredientWithTitle';
import { TABS } from '@/constansts/tabs';

function IngredientsList({
	setSections,
	ref,
}: {
	setSections: React.Dispatch<SetStateAction<SectionsRef>>;
	ref: React.RefObject<HTMLDivElement | null>;
}) {
	const categories = useAppSelector((state: RootState) => state.ingredients);

	return (
		<IngredientsList.Wrapper ref={ref}>
			{categories ? (
				TABS.map((tab) => (
					<IngredientWithTitle
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
		</IngredientsList.Wrapper>
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

IngredientsList.Wrapper = Wrapper;

export default memo(IngredientsList);
