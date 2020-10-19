import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import * as userController from '../services/user-controller';
import { IUser, IUserFriend } from '../types/user';

const loadFrendsList = createAsyncThunk('frendList/loadFrendsList', async (id: number) => {
  const response = await userController.getFriendsByUserId(id) as unknown as IUserFriend[];
  const temp: Array<Promise<AxiosResponse<IUser>>> = [];
  response.forEach((item) =>
    temp.push(userController.getUserById(item.friendId)));
  return Promise.all(temp);
});

interface FrendsState {
  data: IUser[];
  loading: boolean;
  error: null | Error;
  frendsFilter: string;
}

const initialState: FrendsState = {
  data: [],
  loading: false,
  error: null,
  frendsFilter: '',
};

const frendsListSlice = createSlice({
  name: 'frendList',
  initialState,
  reducers: {
    setData: (state, action) =>
      ({ ...state, data: action.payload, loading: false }),
    setError: (state, action) =>
      ({ ...state, error: action.payload, loading: false }),
    setFrendFilter: (state, action) =>
      ({ ...state, frendsFilter: action.payload }),
    setLoading: (state) =>
      ({ ...state, loading: true }),
  },
  extraReducers: {
    [loadFrendsList.pending.type]: (state) =>
      ({ ...state, loading: true }),
    [loadFrendsList.fulfilled.type]: (state, action) =>
      ({
        ...state,
        data: action.payload,
        loading: false,
      }),
    [loadFrendsList.rejected.type]: (state, action) =>
      ({
        ...state,
        error: action.error,
        loading: false,
      }),
  },
});

export const { setData, setError, setLoading, setFrendFilter } = frendsListSlice.actions;
export { loadFrendsList };
export const frendsReducer = frendsListSlice.reducer;
