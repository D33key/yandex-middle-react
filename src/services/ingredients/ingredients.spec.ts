import { describe, it, expect, beforeEach, vi } from 'vitest';
import ingredientsReducer from '.';
import { fetchIngredients } from './asyncThunk';
import { transformData } from '@/helpers/utils/transformData';

// Мокаем transformData
vi.mock('@/helpers/utils/transformData', () => ({
	transformData: vi.fn((data) => data),
}));

describe('ingredientsSlice reducer', () => {
	let initialState: ReturnType<typeof ingredientsReducer>;

	beforeEach(() => {
		initialState = null;
	});

	it('should handle fetchIngredients success', () => {
		const ingredientsData = [
			{ _id: '1', name: 'Salad', type: 'main' },
			{ _id: '2', name: 'Bun', type: 'bun' },
		];

		const action = {
			type: fetchIngredients.fulfilled.type,
			payload: ingredientsData,
		};

		const newState = ingredientsReducer(initialState, action);

		expect(transformData).toHaveBeenCalledWith(ingredientsData);
		expect(newState).toEqual(ingredientsData);
	});

	it('should handle fetchIngredients rejection', () => {
		const action = {
			type: fetchIngredients.rejected.type,
			error: { message: 'Ошибка запроса' },
		};

		console.error = vi.fn();

		const newState = ingredientsReducer(initialState, action);

		expect(console.error).toHaveBeenCalledWith(
			'Ошибка загрузки данных: ',
			'Ошибка запроса',
		);
		expect(newState).toBeNull();
	});
});
