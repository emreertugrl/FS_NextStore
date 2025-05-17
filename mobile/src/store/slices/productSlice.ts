import {createSlice} from '@reduxjs/toolkit';
import {getProduct, getProducts} from '../actions/productActions';

interface ProductState {
  products: string[];
  product: object;
  loading: boolean;
  error: null;
}

const initialState: ProductState = {
  products: [],
  product: {},
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
      })
      .addCase(getProduct.pending, state => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload.product;
        state.loading = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.product = null;
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
