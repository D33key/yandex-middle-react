import { createSlice } from '@reduxjs/toolkit';
import type { AuthWithTokens } from '../../api/types';
import { fetchAuthLogin } from './asyncThunk/login';
import { fetchAuthRegister } from './asyncThunk/register';
import setCookie from '../../utils/cookies/setCookie';
import { fetchAuthCheckUser } from './asyncThunk/checkUser';
import { fetchAuthForgotPassword } from './asyncThunk/forgotPassword';
import { fetchAuthResetPassword } from './asyncThunk/resetPassword';
import { fetchAuthUpdateUser } from './asyncThunk/updateUser';

export const authSlice = createSlice({
	name: 'auth',
	initialState: null as Omit<
		AuthWithTokens,
		'accessToken' | 'refreshToken'
	> | null,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuthLogin.fulfilled, (_, action) => {
				setCookie('accessToken', action.payload.accessToken, 1);
				setCookie('refreshToken', action.payload.refreshToken, 1);

				const userData = {
					user: {
						...action.payload.user,
					},
				};

				return userData;
			})
			.addCase(fetchAuthLogin.rejected, (_, action) => {
				console.error('Ошибка логина: ', action.payload);
			})

			.addCase(fetchAuthRegister.fulfilled, (_, action) => {
				setCookie('accessToken', action.payload.accessToken, 1);
				setCookie('refreshToken', action.payload.refreshToken, 1);

				const userData = {
					user: {
						...action.payload.user,
					},
				};

				return userData;
			})
			.addCase(fetchAuthRegister.rejected, (_, action) => {
				console.error('Ошибка регистрации: ', action.payload);
			})

			.addCase(fetchAuthCheckUser.fulfilled, (state, action) => {
				if (action.payload) {
					if (action.payload.accessToken) {
						setCookie('accessToken', action.payload.accessToken, 1);
						setCookie('refreshToken', action.payload.refreshToken, 1);
					}

					if (!state) {
						const userData = {
							user: {
								...action.payload.user,
							},
						};

						return userData;
					}
				}

				throw new Error('Не валидный пользователь');
			})
			.addCase(fetchAuthCheckUser.rejected, (_, action) => {
				throw new Error(action.payload as string);
			})

			.addCase(fetchAuthForgotPassword.rejected, (_, action) => {
				console.error(
					'Ошибка восстановления пароля через почту: ',
					action.payload,
				);

				if (action.payload !== 'Запрос отклонен') {
					return null;
				}

				throw new Error(action.payload);
			})

			.addCase(fetchAuthResetPassword.rejected, (_, action) => {
				console.error('Ошибка восстановления пароля: ', action.payload);

				if (action.payload !== 'Запрос отклонен') {
					return null;
				}

				throw new Error(action.payload);
			})

			.addCase(fetchAuthUpdateUser.fulfilled, (state, action) => {
				if (action.payload) {
					if (action.payload.accessToken) {
						setCookie('accessToken', action.payload.accessToken, 1);
						setCookie('refreshToken', action.payload.refreshToken, 1);
					}

					if (!state) {
						const userData = {
							user: {
								...action.payload.user,
							},
						};

						return userData;
					}
				}
			})
			.addCase(fetchAuthUpdateUser.rejected, (_, action) => {
				console.error('Ошибка авторизации через токен: ', action.payload);

				if (action.payload !== 'Запрос отклонен') {
					return null;
				}

				throw new Error(action.payload);
			});
	},
});

// export const {  } = ingredientsSlice.actions;

export default authSlice.reducer;
