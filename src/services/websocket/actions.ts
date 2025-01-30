import { WEBSOCKET_ACTIONS } from '@/constansts/websocketActions';

export const createWebsocketConnection = (url?: string, token?: string) => {
	return {
		type: WEBSOCKET_ACTIONS.connect,
		...(url && {
			payload: {
				url,
				token,
			},
		}),
	};
};

export const disconnectWebSocket = () => {
	return {
		type: WEBSOCKET_ACTIONS.disconnect,
	};
};

export const sendMessageWebsocket = <T>(message: T) => {
	return {
		type: WEBSOCKET_ACTIONS.sendMessage,
		payload: JSON.stringify(message),
	};
};
