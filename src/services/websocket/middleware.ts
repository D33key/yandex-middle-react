import { WEBSOCKET_ACTIONS } from '@/constansts/websocketActions';
import { AnyAction, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';

type WebSocketMiddlewareOptions = {
	url: string;
	actions: typeof WEBSOCKET_ACTIONS;
	onOpen?: (event: Event) => void;
	onClose?: (event: CloseEvent) => void;
	onMessage?: (event: MessageEvent) => void;
	onError?: (event: Event) => void;
};

function createWebSocketMiddleware(options: WebSocketMiddlewareOptions) {
	let socket: WebSocket | null = null;
	let currentUrl = options.url;

	return (store: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction) => {
		const { actions } = options;

		switch (action.type) {
			case actions.connect: {
				if (socket !== null) {
					console.warn('WebSocket is already connected.');
					return;
				}

				socket = new WebSocket(currentUrl);

				socket.onopen = (event) => {
					options.onOpen?.(event);
					store.dispatch({ type: actions.onConnected });
				};

				socket.onclose = (event) => {
					store.dispatch({ type: actions.onDisconnected, payload: event });
					socket = null;
				};

				socket.onmessage = (event) => {
					options.onMessage?.(event);
					store.dispatch({
						type: actions.onMessageReceived,
						payload: event.data,
					});
				};

				socket.onerror = (event) => {
					options.onError?.(event);
					store.dispatch({ type: actions.onError, payload: event });
				};

				break;
			}

			case actions.disconnect: {
				if (socket !== null) {
					socket.close();
				}
				socket = null;
				break;
			}

			case actions.sendMessage: {
				if (socket !== null && socket.readyState === WebSocket.OPEN) {
					socket.send(action.payload);
				} else {
					console.warn('WebSocket is not open. Cannot send message.');
				}
				break;
			}

			case actions.changeUrl: {
				if (!action.payload) {
					throw new Error('Следует указать url в payload');
				}
				currentUrl = action.payload;

				if (socket !== null) {
					socket.close();
					socket = new WebSocket(currentUrl);
				}
				break;
			}

			default:
				break;
		}

		return next(action);
	};
}

export default createWebSocketMiddleware;
