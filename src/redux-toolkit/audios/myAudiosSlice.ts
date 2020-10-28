import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { fetchAudiosAll } from '../../services/audios-controller/audio-controller';

export const myAudiosAction = createAsyncThunk(
  'fetch/myAudiosAction',
  async () => {
    const response = await fetchAudiosAll();
    console.log('response MYaudios action', response);
    return response.data;
  },
);

const myAudiosSlice = createSlice({
  name: 'myAudiosSlice',
  initialState: { myAudios: [], loading: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(myAudiosAction.pending, (state, action) => {
      console.log('pending');
    });
    builder.addCase(myAudiosAction.fulfilled, (state: Draft<any>, action: PayloadAction<any>) => {
      console.log('state myAudiosAction', state);
      console.log('action myAudiosAction', action);
      console.log('fulfilled');
      state.myAudios.push(...action.payload);
    });
    builder.addCase(myAudiosAction.rejected, (state, action) => {
      console.log('reject');
    });
  },
});

const myAudiosReducer = myAudiosSlice.reducer;
export default myAudiosReducer;
