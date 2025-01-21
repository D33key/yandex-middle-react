import passwordApi from '@/api/passwordApi';
import convertFormDataToObject from '@/helpers/utils/convertFormDataToObject';
import isAborted from '@/helpers/utils/isAborted';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface ForgotPasswordResponse {
	success: boolean;
	message: string;
}

export const fetchAuthForgotPassword = createAsyncThunk(
	'auth-forgot-password',
	async (formData: FormData, { signal, rejectWithValue }) => {
		try {
			const obj = convertFormDataToObject(formData);
			const response = await passwordApi.forgotPassword<ForgotPasswordResponse>(
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
