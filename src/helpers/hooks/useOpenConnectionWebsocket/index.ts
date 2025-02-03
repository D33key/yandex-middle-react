import {
	createWebsocketConnection,
	disconnectWebSocket,
} from '@/services/websocket/actions';
import { useEffect } from 'react';
import { useAppDispatch } from '../useRTK';
import { fetchAuthCheckUser } from '@/services/auth/asyncThunk/checkUser';
import getCookie from '@/helpers/utils/cookies/getCookie';
import { TOKENS } from '@/constansts';

export default function useOpenConnectionWebsocket(isForSpecificUser = false) {
	const url = isForSpecificUser
		? import.meta.env.VITE_WEBSOCKET_USER_ORDER
		: import.meta.env.VITE_WEBSOCKET_ALL_ORDERS_URL;

	const dispatch = useAppDispatch();

	useEffect(() => {
		const createConnection = async () => {
			let cookie = undefined;

			if (isForSpecificUser) {
				await dispatch(fetchAuthCheckUser());

				cookie = getCookie(TOKENS[0]);

				if (!cookie) throw new Error('Не удалось получить токен');

				cookie = cookie.split(' ')[1];
			}

			dispatch(createWebsocketConnection(url, cookie));
		};

		createConnection();

		return () => {
			dispatch(disconnectWebSocket());
		};
	}, []);
}
