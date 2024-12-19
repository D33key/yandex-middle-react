import BurgerConstructor from '../components/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../components/burger-ingredients/BurgerIngredients';
import AppHeader from '../components/header/AppHeader';
import Title from '../components/ui/heading/Title';
import Section from '../components/ui/section/Section';

function Constructor() {
	return (
		<>
			<AppHeader />
			<main>
				<Section>
					<Title>Соберите бургер</Title>
					<div className='flex justify-between'>
						<BurgerIngredients />
						<BurgerConstructor />
					</div>
				</Section>
			</main>
		</>
	);
}

export default Constructor;
