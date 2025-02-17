import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest';
import modalInfoReducer, { openModal, closeModal } from '.';
import { fetchOrder } from './asyncThunk';
import type { CategoriesType } from '../../types/burger-structure';
import { OrderInfo } from './type';

// Мокаем localStorage

describe('modalInfo reducer', () => {
	let initialState: ReturnType<typeof modalInfoReducer>;

	beforeEach(() => {
		vi.stubGlobal('localStorage', {
			getItem: vi.fn(() => null),
			setItem: vi.fn(),
			removeItem: vi.fn(),
		});
		initialState = null;
	});

	it('should handle openModal', () => {
		const modalData: CategoriesType = { _id: '1', name: 'Salad', type: 'main' };

		const action = openModal(modalData);
		const newState = modalInfoReducer(initialState, action);

		expect(newState).toEqual(modalData);
		expect(localStorage.setItem).toHaveBeenCalledWith(
			'modalInfo',
			JSON.stringify(modalData),
		);
	});

	it('should handle closeModal', () => {
		const action = closeModal();
		const newState = modalInfoReducer(
			{ _id: '1', name: 'Salad', type: 'main' },
			action,
		);

		expect(newState).toBeNull();
	});

	it('should handle fetchOrder success', () => {
		const orderData: OrderInfo = { orderId: '12345', status: 'completed' };

		const action = {
			type: fetchOrder.fulfilled.type,
			payload: orderData,
		};

		const newState = modalInfoReducer(initialState, action);

		expect(newState).toEqual(orderData);
	});

	it('should handle fetchOrder pending', () => {
		const action = { type: fetchOrder.pending.type };
		const newState = modalInfoReducer(initialState, action);

		expect(newState).toEqual({ isLoading: true });
	});

	it('should handle fetchOrder rejection', () => {
		const action = {
			type: fetchOrder.rejected.type,
			error: { message: 'Ошибка запроса' },
		};

		console.error = vi.fn();

		const newState = modalInfoReducer(initialState, action);

		expect(console.error).toHaveBeenCalledWith(
			'Ошибка загрузки данных: ',
			'Ошибка запроса',
		);
		expect(newState).toBeNull();
	});
});
