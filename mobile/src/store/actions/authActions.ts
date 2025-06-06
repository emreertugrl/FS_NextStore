// store/actions/authActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getRequest, postRequest, putRequest} from '../../service/verbs';
import {
  FAVOURITES_URL,
  LOGIN_URL,
  LOGOUT_URL,
  ME_URL,
} from '../../service/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const response = await getRequest(ME_URL, {});
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
});

export const loginThunk = createAsyncThunk('auth/login', async values => {
  try {
    const response = await postRequest(LOGIN_URL, values);
    const {accessToken, refreshToken} = response.data;

    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  try {
    await postRequest(LOGOUT_URL, {});

    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');

    return;
  } catch (error) {
    console.log(error);
  }
});

export const favoutireProduct = createAsyncThunk(
  'auth/favoutireProduct',
  async productId => {
    try {
      const response = await putRequest(`${FAVOURITES_URL}/${productId}`, {});
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getUserFavorites = createAsyncThunk(
  'auth/getUserFavorites',
  async userId => {
    try {
      const response = await getRequest(`/auth/${userId}/favourites`, {});
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);
