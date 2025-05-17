// store/actions/authActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getRequest} from '../../service/verbs';
import {ME_URL} from '../../service/urls';

export const getMe = createAsyncThunk('auth/getMe', async refreshToken => {
  try {
    const response = await getRequest(ME_URL, {});

    return response.data; // örn: user object
  } catch (error: any) {}
});
