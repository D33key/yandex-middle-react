import { useEffect, useState } from 'react';
import { TOKENS } from '../../constansts';
import { fetchAuthCheckUser } from '../../services/auth/asyncThunk/checkUser';
import eraseCookie from '../../utils/cookies/eraseCookie';
import { useAppDispatch } from '../useRTK';

export default function useAuth(pathname: string = '') {
	const [isLoading, setIsLoading] = useState(true);
	const [isUserExist, setIsUserExist] = useState(false);

	const dispatch = useAppDispatch();

	useEffect(() => {
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
	}, [pathname]);

	return { isLoading, isUserExist };
}
