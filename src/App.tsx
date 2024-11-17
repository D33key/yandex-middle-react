import BurgerConstructor from './components/burger-constructor/BurgerConstructor';
import BurgerIngredients from './components/burger-ingredients/BurgerIngredients';
import AppHeader from './components/header/AppHeader';
import Section from './components/section/Section';
import Title from './components/ui/heading/Title';
import './style/global.css';

function App() {
	return (
		<main>
			<AppHeader />
			<Section>
				<Title>Соберите бургер</Title>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<BurgerIngredients />
					<BurgerConstructor />
				</div>
			</Section>
		</main>
	);
}

export default App;
