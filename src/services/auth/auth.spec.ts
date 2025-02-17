import { describe, it, expect, beforeEach, vi } from 'vitest';
import authReducer from '.';

import setCookie from '@/helpers/utils/cookies/setCookie';
import eraseCookie from '@/helpers/utils/cookies/eraseCookie';
import { TOKENS } from '@/constansts';
import { fetchAuthLogin } from './asyncThunk/login';
import { fetchAuthRegister } from './asyncThunk/register';
import { fetchAuthCheckUser } from './asyncThunk/checkUser';
import { fetchAuthLogout } from './asyncThunk/logout';
import { fetchAuthForgotPassword } from './asyncThunk/forgotPassword';
import { fetchAuthResetPassword } from './asyncThunk/resetPassword';
import { fetchAuthUpdateUser } from './asyncThunk/updateUser';

// Мокаем функции работы с куками
vi.mock('@/helpers/utils/cookies/setCookie');
vi.mock('@/helpers/utils/cookies/eraseCookie');

describe('authSlice reducer', () => {
	let initialState: ReturnType<typeof authReducer>;

	beforeEach(() => {
		initialState = null;
	});

	it('should handle login success', () => {
		const user = { email: 'test@example.com', name: 'Test User' };
		const action = {
			type: fetchAuthLogin.fulfilled.type,
			payload: { accessToken: 'token123', refreshToken: 'refresh123', user },
		};

		const newState = authReducer(initialState, action);

		expect(newState).toEqual({ user });
		expect(setCookie).toHaveBeenCalledWith('accessToken', 'token123', 1);
		expect(setCookie).toHaveBeenCalledWith('refreshToken', 'refresh123', 1);
	});

	it('should handle register success', () => {
		const user = { email: 'test@example.com', name: 'New User' };
		const action = {
			type: fetchAuthRegister.fulfilled.type,
			payload: { accessToken: 'regToken', refreshToken: 'regRefresh', user },
		};

		const newState = authReducer(initialState, action);

		expect(newState).toEqual({ user });
		expect(setCookie).toHaveBeenCalledWith('accessToken', 'regToken', 1);
		expect(setCookie).toHaveBeenCalledWith('refreshToken', 'regRefresh', 1);
	});

	it('should handle check user success', () => {
		const user = { email: 'test@example.com', name: 'Checked User' };
		const action = {
			type: fetchAuthCheckUser.fulfilled.type,
			payload: {
				accessToken: 'newAccessToken',
				refreshToken: 'newRefreshToken',
				user,
			},
		};

		const newState = authReducer(initialState, action);

		expect(newState).toEqual({ user });
		expect(setCookie).toHaveBeenCalledWith('accessToken', 'newAccessToken', 1);
		expect(setCookie).toHaveBeenCalledWith(
			'refreshToken',
			'newRefreshToken',
			1,
		);
	});

	it('should handle logout', () => {
		const action = { type: fetchAuthLogout.fulfilled.type };
		const newState = authReducer(
			{ user: { email: 'test@example.com', name: 'Test User' } },
			action,
		);

		expect(newState).toBeNull();
		expect(eraseCookie).toHaveBeenCalledTimes(TOKENS.length);
	});

	it('should handle forgot password rejection', () => {
		const action = {
			type: fetchAuthForgotPassword.rejected.type,
			payload: 'Запрос отклонен',
		};

		expect(() => authReducer(initialState, action)).toThrow('Запрос отклонен');
	});

	it('should handle reset password rejection', () => {
		const action = {
			type: fetchAuthResetPassword.rejected.type,
			payload: 'Запрос отклонен',
		};

		expect(() => authReducer(initialState, action)).toThrow('Запрос отклонен');
	});

	it('should handle update user success', () => {
		const user = { email: 'updated@example.com', name: 'Updated User' };
		const action = {
			type: fetchAuthUpdateUser.fulfilled.type,
			payload: { user },
		};

		const newState = authReducer(initialState, action);

		expect(newState).toEqual({ user });
	});

	it('should return initial state for unknown action type', () => {
    const action = { type: 'SOME_UNKNOWN_ACTION' };
    const newState = authReducer(initialState, action);

    expect(newState).toEqual(initialState);
});
});
