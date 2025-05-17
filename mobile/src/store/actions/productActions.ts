// store/actions/authActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getRequest} from '../../service/verbs';
import {GET_PRODUCTS_URL} from '../../service/urls';

export const getProducts = createAsyncThunk('auth/getMe', async () => {
  try {
    const response = await getRequest(GET_PRODUCTS_URL, {});
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
});
