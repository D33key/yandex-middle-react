import generalAPI from '@/api/generalApi';
import { WEBSOCKET_ACTIONS } from '@/constansts/websocketActions';
import { AnyAction, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';
import { WebSocketData, WebSocketOrder } from './slice';
import { CategoriesType } from '@/types/burger-structure';

type WebSocketMiddlewareOptions = {
	url: string;
	actions: typeof WEBSOCKET_ACTIONS;
	onOpen?: (event: Event) => void;
	onClose?: (event: CloseEvent) => void;
	onMessage?: (
		event: MessageEvent,
		orders: WebSocketOrder[],
	) => Promise<WebSocketOrder[]>;
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

				if (action.payload?.url) {
					currentUrl = action.payload.url;
				}

				if (action.payload?.token) {
					currentUrl += `?token=${action.payload.token}`;
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

				socket.onmessage = async (event) => {
					if (event.data === 'ping') {
						socket!.send('pong');

						return;
					}
					const transformData = JSON.parse(event.data) as WebSocketData;
					const data = await options.onMessage?.(event, transformData.orders);
					store.dispatch({
						type: actions.onMessageReceived,
						payload: data,
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

const websocketMiddleware = createWebSocketMiddleware({
	url: 'wss://norma.nomoreparties.space',
	actions: WEBSOCKET_ACTIONS,
	onMessage: async (_, orders) => {
		const { data: ingredients } = (await generalAPI.getIngredients()) as {
			data: CategoriesType[];
		};

		const transformOrder: WebSocketOrder[] = orders.map((order) => {
			let sum = 0;
			const ingredientsImg = order.ingredients.map((ingredient) => {
				const findIngredient = ingredients.find(
					(ingr) => ingr._id === ingredient,
				);
				console.log('sum', sum);
				console.log('findIngredient!.price', findIngredient!.price);
				sum += findIngredient!.price;

				return findIngredient!.image;
			});

			return {
				...order,
				ingredients: ingredientsImg,
				price: sum,
			};
		});

		return transformOrder;
	},
});

export default websocketMiddleware;
