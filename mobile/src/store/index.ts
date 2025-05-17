import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

// RootState ve AppDispatch tipleri export edilir
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
