import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getMe} from '../actions/authActions';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any; // kullanıcı bilgisi de tutulabilir
  loading: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: any;
      }>,
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    setTokens(
      state,
      action: PayloadAction<{accessToken: string; refreshToken: string}>,
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: builder => {
    builder
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
      });
  },
});

export const {loginSuccess, logout, setTokens} = authSlice.actions;
export default authSlice.reducer;
