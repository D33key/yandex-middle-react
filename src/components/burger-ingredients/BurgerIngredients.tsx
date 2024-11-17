import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import cl from './BurgerIngredients.module.css';

export default function BurgerIngredients() {
	const [current, setCurrent] = useState('one');
	return (
		<div>
			<div className={cl.tabWrapper}>
				<Tab value='one' active={current === 'one'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value='two' active={current === 'two'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value='three' active={current === 'three'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>
		</div>
	);
}
