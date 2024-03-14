import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../api/supabaseClient';

const initialState = {
  question: [],
  answer: [],
  status: 'idle',
};

export const fetchQuestion = createAsyncThunk('question/fetchquestion', async(type) => {
  const response = await supabase
  .from('question')
  .select('*')
  .eq('questionType', type);
  // console.log(response);
  return response.data;
});

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMsg(state, action) {
      state.answer = action.payload;
      // console.log(state.answer);
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchQuestion.fulfilled, (state, action) => {
      state.status = 'succeed';
      state.question = action.payload;
    });
  },
});

export const { addMsg } = chatSlice.actions;

export default chatSlice.reducer;

export const selectQuestion = (state) => state.chat.question;
export const selectAnswer = (state) => state.chat.answer;

export const selectMsg = (state) => {
  const question = selectQuestion(state);
  const answer = selectAnswer(state);
  return [...question, ...answer];
};

