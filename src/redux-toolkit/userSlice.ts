import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserById } from '../services/user-controller';
import { IUser } from '../types/user';

const loadUser = createAsyncThunk('user/loadUser', async (id: number) => {
  const response = await getUserById(id);
  return response;
});

interface UserState {
  data: null | IUser,
  loading: boolean,
  error: null | Error,
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) =>
      initialState,
  },
  extraReducers: {
    /*
    LOAD USER
      Загружает текущего отображаемого юзера.
      Использовать для отображения личной страницы другого пользователя и т.д.
    */
    [loadUser.pending.type]: (state) =>
      ({ ...state, loading: true }),
    [loadUser.fulfilled.type]: (state, action) =>
      ({
        ...state,
        data: action.payload,
        loading: false,
      }),
    [loadUser.rejected.type]: (state, action) =>
      ({
        ...state,
        error: action.error,
        loading: false,
      }),
  },
});

export { loadUser };
export const { resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
