import { useEffect, useState } from 'react';
import eraseCookie from '../../utils/cookies/eraseCookie';
import { useAppDispatch } from '../useRTK';
import { fetchAuthCheckUser } from '@/services/auth/asyncThunk/checkUser';
import { TOKENS } from '@/constansts';
import getCookie from '@/helpers/utils/cookies/getCookie';

export default function useAuth(pathname: string = '') {
	const [isLoading, setIsLoading] = useState(true);
	const [isUserExist, setIsUserExist] = useState(false);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const token = getCookie('accessToken');
		if (token) {
			const promise = dispatch(fetchAuthCheckUser());
			promise
				.then((_) => {
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

			return () => {
				promise?.abort('Запрос отклонен');
			};
		} else {
			setIsLoading(false);
		}
	}, [pathname]);

	return { isLoading, isUserExist };
}
