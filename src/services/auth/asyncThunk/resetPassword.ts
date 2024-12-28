import { createAsyncThunk } from '@reduxjs/toolkit';
import { ForgotPasswordResponse } from './forgotPassword';
import convertFormDataToObject from '@/helpers/utils/convertFormDataToObject';
import passwordApi from '@/api/passwordApi';
import isAborted from '@/helpers/utils/isAborted';

export const fetchAuthResetPassword = createAsyncThunk(
	'auth-reset-password',
	async (formData: FormData, { signal, rejectWithValue }) => {
		try {
			const obj = convertFormDataToObject(formData);
			const response = await passwordApi.resetPassword<ForgotPasswordResponse>(
				obj,
				signal,
			);

			return response;
		} catch (error) {
			if (isAborted(error)) {
				return rejectWithValue('Запрос отменен');
			}
			const errorResponse = await (error as Response).json();

			return rejectWithValue(errorResponse.message);
		}
	},
);
