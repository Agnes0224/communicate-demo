import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  status: 'idle',
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', async() => {
  // const response = await supabase
  // .from('user-ranking')
  // .select('*')
  // .eq('type', type);
  // // console.log(response);
  // return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'succeed';
      state.users = action.payload;
    });
  },
});

export default userSlice.reducer;

export const selectUsers = (state) => state.user.users;
