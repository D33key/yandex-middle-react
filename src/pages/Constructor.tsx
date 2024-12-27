import BurgerConstructor from '../organisms/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../cells/burger-structure';
import Title from '../atoms/heading/Title';
import Section from '../atoms/section/Section';
import Main from '@/atoms/main/Main';

function Constructor() {
	return (
		<Main>
			<Section>
				<Title>Соберите бургер</Title>
				<div className='flex justify-between'>
					<BurgerIngredients />
					<BurgerConstructor />
				</div>
			</Section>
		</Main>
	);
}

export default Constructor;
