import {createAsyncThunk} from '@reduxjs/toolkit';
import {getRequest} from '../../service/verbs';
import {GET_CATEGORIES_URL, GET_CATEGORY_URL} from '../../service/urls';

export const getCategories = createAsyncThunk(
  'auth/getCategories',
  async () => {
    try {
      const response = await getRequest(GET_CATEGORIES_URL, {});
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  },
);

export const getCategory = createAsyncThunk(
  'auth/getCategory',
  async (id: string) => {
    try {
      const response = await getRequest(`${GET_CATEGORY_URL}/${id}`, {});
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  },
);
