// store/actions/authActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getRequest} from '../../service/verbs';
import {GET_PRODUCT_URL, GET_PRODUCTS_URL} from '../../service/urls';

export const getProducts = createAsyncThunk(
  'auth/getProducts',
  async (filters?: any) => {
    try {
      const response = await getRequest(GET_PRODUCTS_URL, {params: filters});
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  },
);

export const getProduct = createAsyncThunk(
  'auth/getProduct',
  async (id: string) => {
    try {
      const response = await getRequest(`${GET_PRODUCT_URL}/${id}`, {});
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  },
);
