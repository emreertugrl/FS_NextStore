import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
  },
});

// RootState ve AppDispatch tipleri export edilir
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
