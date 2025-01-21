import { createAsyncThunk } from '@reduxjs/toolkit';
import convertFormDataToObject from '@/helpers/utils/convertFormDataToObject';
import isAborted from '@/helpers/utils/isAborted';
import authApi from '@/api/authApi';
import type { BaseAuth } from '@/api/types';

export const fetchAuthUpdateUser = createAsyncThunk(
	'auth-update-user',
	async (data: FormData, { rejectWithValue }) => {
		try {
			const obj = convertFormDataToObject(data);

			const response = await authApi.updateUserInfo<BaseAuth>(obj);

			delete response.success;

			return response;
		} catch (error) {
			if (isAborted(error)) {
				return rejectWithValue('Запрос отменен');
			}

			return rejectWithValue('Не валидный пользователь');
		}
	},
);
