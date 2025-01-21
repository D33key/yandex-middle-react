import { memo, SetStateAction } from 'react';
import cl from './IngredientsList.module.css';
import type { RootState } from '@/services/store';
import Loader from '@/molecules/loader';
import IngredientWithTitle from '@/molecules/ingredient-with-title/IngredientWithTitle';
import { TABS } from '@/constansts/tabs';
import type { SectionsRef } from '@/helpers/hooks/useTab';
import { useAppSelector } from '@/helpers/hooks/useRTK';
import { useFetchIngredients } from '@/helpers/hooks/useFetchIngredients';

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
