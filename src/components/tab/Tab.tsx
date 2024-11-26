import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { tabs } from '../burger-ingredients/constants';
import cl from './Tab.module.css';
import { TabName } from './types';

export default function Tabs({
	current,
	setCurrent,
}: {
	current: TabName;
	setCurrent: (value: TabName) => void;
}) {
	return (
		<div className={cl.tabWrapper}>
			{tabs.map((tab) => (
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
