import { useEffect, useRef, useState } from 'react';
import { fetchAuthCheckUser } from '../../services/auth/asyncThunk/checkUser';
import getCookie from '../../utils/cookies/getCookie';
import { useAppDispatch } from '../useRTK';

export default function useAuth() {
	const [isLoading, setIsLoading] = useState(true);
	const [isUserExist, setIsUserExist] = useState(false);
	const controller = useRef<AbortController | null>(null);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const accessToken = getCookie('accessToken');

		if (accessToken) {
			try {
				controller.current = new AbortController();

				const checkUser = async () => {
					const token = getCookie('refreshToken');

					if (!token) {
						setIsLoading(false);
						setIsUserExist(false);
						return;
					}

					await dispatch(
						fetchAuthCheckUser({ token, signal: controller.current?.signal }),
					);

					setIsLoading(false);
					setIsUserExist(true);
				};

				checkUser();
			} catch (error) {
				console.error((error as Error).message);
				setIsLoading(false);
				setIsUserExist(false);
			}
		} else {
			setIsLoading(false);
			setIsUserExist(false);
		}

		return () => {
			controller.current?.abort();
		};
	}, []);

	return { isLoading, isUserExist };
}
