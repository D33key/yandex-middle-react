import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cl from './Tab.module.css';
import { useState } from 'react';
import { TabName } from './types';

export default function Tabs() {
	const [current, setCurrent] = useState<TabName>('bun');

	return (
		<div className={cl.tabWrapper}>
			<Tab
				value={'bun'}
				active={current === 'bun'}
				onClick={(value) => setCurrent(value as TabName)}
			>
				Булки
			</Tab>
			<Tab
				value='sauce'
				active={current === 'sauce'}
				onClick={(value) => setCurrent(value as TabName)}
			>
				Соусы
			</Tab>
			<Tab
				value='main'
				active={current === 'main'}
				onClick={(value) => setCurrent(value as TabName)}
			>
				Начинки
			</Tab>
		</div>
	);
}
