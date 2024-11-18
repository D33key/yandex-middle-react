import { lazy } from 'react';

export const BURGER_INGREDIENTS = [
	lazy(() => import('./burger-components/Ingredient')),
	lazy(() => import('./burger-components/Sauces')),
	lazy(() => import('./burger-components/Filling')),
];
