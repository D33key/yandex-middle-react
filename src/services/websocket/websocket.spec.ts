import { WEBSOCKET_ACTIONS } from '@/constansts/websocketActions';
import { describe, expect, it } from 'vitest';
import webSocketReducer, { WebSocketState } from './slice';
import { beforeEach } from 'node:test';

describe('webSocketSlice', () => {
	let initialState: WebSocketState | undefined;
	beforeEach(() => {
		initialState = {
			connected: false,
			error: null,
			data: null,
		};
	});
	it('should handle onConnected action', () => {
		const action = { type: WEBSOCKET_ACTIONS.onConnected };
		const state = webSocketReducer(initialState, action);

		expect(state.connected).toBe(true);
		expect(state.error).toBeNull();
	});

	it('should handle onDisconnected action', () => {
		const action = { type: WEBSOCKET_ACTIONS.onDisconnected };
		const state = webSocketReducer(initialState, action);

		expect(state.connected).toBe(false);
		expect(state.data).toBeNull();
	});

	it('should handle onMessageReceived action', () => {
		const messageData = { key: 'value' }; // Example message data
		const action = {
			type: WEBSOCKET_ACTIONS.onMessageReceived,
			payload: messageData,
		};
		const state = webSocketReducer(initialState, action);

		expect(state.data).toEqual(messageData);
	});

	it('should handle onError action', () => {
		const errorMessage = 'WebSocket error';
		const action = { type: WEBSOCKET_ACTIONS.onError, payload: errorMessage };
		const state = webSocketReducer(initialState, action);

		expect(state.error).toBe(errorMessage);
	});
});
