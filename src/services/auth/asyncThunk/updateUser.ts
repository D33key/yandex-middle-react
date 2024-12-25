import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../../api/authApi';
import { BaseAuth } from '../../../api/types';
import convertFormDataToObject from '../../../utils/convertFormDataToObject';
import isAborted from '../../../utils/isAborted';

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
