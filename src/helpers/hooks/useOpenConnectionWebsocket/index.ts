import {
	createWebsocketConnection,
	disconnectWebSocket,
} from '@/services/websocket/actions';
import { useEffect } from 'react';
import { useAppDispatch } from '../useRTK';

export default function useOpenConnectionWebsocket(
	url: string = import.meta.env.VITE_WEBSOCKET_ALL_ORDERS_URL,
	token?: string,
) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(createWebsocketConnection(url, token));
		return () => {
			if (import.meta.env.PROD) dispatch(disconnectWebSocket());
		};
	}, []);
}
