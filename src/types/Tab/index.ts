export type TabName = 'bun' | 'sauce' | 'main';
export interface TabsProps {
	current: TabName;
	setCurrent: (value: TabName) => void;
}
