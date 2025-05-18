import {createSlice} from '@reduxjs/toolkit';
import {getCategories, getCategory} from '../actions/categoryActions';

interface CategoryState {
  categories: string[] | null;
  category: object;
  loading: boolean;
  error: object | null;
}

const initialState: CategoryState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategories.pending, state => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.categories = null;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getCategory.pending, state => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.category = action.payload.category;
        state.loading = false;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.categories = null;
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
