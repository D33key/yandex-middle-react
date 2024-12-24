import { useEffect, useRef, useState } from 'react';
import { fetchAuthCheckUser } from '../../services/auth/asyncThunk/checkUser';
import getCookie from '../../utils/cookies/getCookie';
import { useAppDispatch } from '../useRTK';
import { TOKENS } from '../../constansts';
import eraseCookie from '../../utils/cookies/eraseCookie';

export default function useAuth() {
	const [isLoading, setIsLoading] = useState(true);
	const [isUserExist, setIsUserExist] = useState(false);
	const controller = useRef<AbortController | null>(null);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const accessToken = getCookie('accessToken');

		if (accessToken) {
			controller.current = new AbortController();

			dispatch(fetchAuthCheckUser({ signal: controller.current?.signal }))
				.then((_) => {
					console.log('@@@@ WTF?')
					setIsLoading(false);
					setIsUserExist(true);
				})
				.catch((res) => {
					if (res.message !== 'Запрос отклонен') {
						setIsLoading(false);
						setIsUserExist(false);
						TOKENS.forEach((token) => eraseCookie(token));
					}
				});
		} else {
			setIsLoading(false);
			setIsUserExist(false);
			TOKENS.forEach((token) => eraseCookie(token));
		}

		return () => {
			controller.current?.abort('Запрос отклонен');
		};
	}, []);

	return { isLoading, isUserExist };
}
