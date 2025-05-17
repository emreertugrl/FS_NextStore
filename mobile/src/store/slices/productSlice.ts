import {createSlice} from '@reduxjs/toolkit';
import {getProducts} from '../actions/productActions';

interface ProductState {
  products: string[];
  loading: boolean;
  error: null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.products = null;
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
