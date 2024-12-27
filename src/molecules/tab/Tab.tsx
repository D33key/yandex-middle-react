import Tab from '@/atoms/tab';
import cl from './Tab.module.css';
import type { TabsProps } from '@/types/Tab';
import { TABS } from '@/constansts/tabs';

export default function Tabs({ current, setCurrent }: TabsProps) {
	return (
		<div className={cl.tabWrapper}>
			{TABS.map((tab) => (
				<Tab
					key={tab.id}
					value={tab.id}
					active={current === tab.id}
					onClick={setCurrent as (value: string) => void}
				>
					{tab.title}
				</Tab>
			))}
		</div>
	);
}
