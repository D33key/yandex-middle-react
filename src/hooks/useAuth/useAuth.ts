import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../useRTK';
import getCookie from '../../utils/cookies/getCookie';
import { fetchAuthCheckUser } from '../../services/auth/asyncThunk/checkUser';

export default function useAuth() {
	const [isLoading, setIsLoading] = useState(true);
	const userData = useAppSelector((state) => state.authSlice);
	const dispatch = useAppDispatch();
	const controller = useRef<AbortController | null>(null);

	useEffect(() => {
		if (!userData) {
			try {
				controller.current = new AbortController();

				const checkUser = async () => {
					const token = getCookie('refreshToken');

					if (!token) {
						setIsLoading(false);
						return;
					}

					await dispatch(
						fetchAuthCheckUser({ token, signal: controller.current?.signal }),
					);

					setIsLoading(false);
				};

				checkUser();
			} catch (error) {
				console.error((error as Error).message);
				setIsLoading(false);
			} 
		} else {
			setIsLoading(false);
		}

		return () => {
			controller.current?.abort();
		};
	}, []);

	return { isLoading, userData };
}
