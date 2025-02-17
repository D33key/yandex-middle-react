import { describe, it, expect, beforeEach } from 'vitest';
import { BurgerStructureState } from './types';
import { burgerStructure } from '.';
import uuid4 from 'uuid4';

describe('burgerStructure reducer', () => {
	let initialState: BurgerStructureState[];

	beforeEach(() => {
		initialState = [];
	});

	it('should add an ingredient', () => {
		const ingredient = { _id: '123', name: 'Salad', type: 'main' };
		const action = burgerStructure.actions.addIngredient(ingredient);
		const newState = burgerStructure.reducer(initialState, action);

		expect(newState).toHaveLength(1);
		expect(newState[0]._id).toBe('123');
		expect(newState[0]).toHaveProperty('id');
	});

	it('should remove an ingredient by id', () => {
		const ingredient1 = {
			_id: '123',
			name: 'Salad',
			type: 'main',
			id: uuid4(),
		};
		const ingredient2 = {
			_id: '456',
			name: 'Cheese',
			type: 'main',
			id: uuid4(),
		};

		const state = [ingredient1, ingredient2];
		const action = burgerStructure.actions.removeIngredient('123');
		const newState = burgerStructure.reducer(state, action);

		expect(newState).toHaveLength(1);
		expect(newState[0]._id).toBe('456');
	});

	it('should move an ingredient', () => {
		const ingredient1 = {
			_id: '123',
			name: 'Salad',
			type: 'main',
			id: uuid4(),
		};
		const ingredient2 = {
			_id: '456',
			name: 'Cheese',
			type: 'main',
			id: uuid4(),
		};

		const state = [ingredient1, ingredient2];
		const action = burgerStructure.actions.moveIngredient({
			dragIndex: 0,
			hoverIndex: 1,
		});
		const newState = burgerStructure.reducer(state, action);

		expect(newState[0]._id).toBe('456');
		expect(newState[1]._id).toBe('123');
	});

	it('should clear the constructor', () => {
		const state = [{ _id: '123', name: 'Salad', type: 'main', id: uuid4() }];
		const action = burgerStructure.actions.clearCart();
		const newState = burgerStructure.reducer(state, action);

		expect(newState).toEqual([]);
	});
});
