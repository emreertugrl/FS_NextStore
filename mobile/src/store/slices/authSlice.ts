import {createSlice} from '@reduxjs/toolkit';
import {
  favoutireProduct,
  getMe,
  getUserFavorites,
  loginThunk,
  logoutThunk,
} from '../actions/authActions';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any; // kullanıcı bilgisi de tutulabilir
  loading: boolean;
  favorites: string[];
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  loading: false,
  favorites: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.refreshToken = action.payload.refreshToken;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, state => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutThunk.pending, state => {
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.user = null;
        state.refreshToken = null;
        state.accessToken = null;
        state.loading = false;
      })
      .addCase(logoutThunk.rejected, state => {
        state.user = null;
        state.loading = false;
      })
      .addCase(getMe.pending, state => {
        state.loading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getMe.rejected, state => {
        state.user = null;
        state.loading = false;
      })
      .addCase(favoutireProduct.pending, state => {
        state.loading = true;
      })
      .addCase(favoutireProduct.fulfilled, (state, action) => {
        state.user.favorites = action.payload;
        state.loading = false;
      })
      .addCase(favoutireProduct.rejected, state => {
        state.user.favorites = [];
        state.loading = false;
      })
      .addCase(getUserFavorites.pending, state => {
        state.loading = true;
      })
      .addCase(getUserFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.loading = false;
      })
      .addCase(getUserFavorites.rejected, state => {
        state.favorites = [];
        state.loading = false;
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
