import { TabName } from '../tab/types';

export interface Tabs {
	id: TabName;
	title: string;
}

export const TABS: Tabs[] = [
	{
		id: 'bun',
		title: 'Булки',
	},
	{
		id: 'sauce',
		title: 'Соусы',
	},
	{
		id: 'main',
		title: 'Начинки',
	},
];
