/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../api/server';

const initialState = {
  question: [],
  answer: [],
  status: 'idle',
};

// export const fetchQuestion = createAsyncThunk('question/fetchquestion', async(type) => {
//   const response = await supabase
//   .from('question')
//   .select('*')
//   .eq('questionType', type);
//   // console.log(response);
//   return response.data;
// });

export const fetchQuestion = createAsyncThunk('question/fetchQuestion', async(question_id) => {
  const response = await http.get('/training/question', { question_id });
  // console.log(response);
  return response.data.data;
});

export const fetchAnswer = createAsyncThunk('question/fetchAnswer', async(params) => {
  const response = await http.post('/training/answer/user', params);
  // console.log(response);
  return response.data.data;
});

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    cleanMsg(state) {
      state.answer = '';
      // console.log(state.answer);
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchQuestion.fulfilled, (state, action) => {
      state.status = 'succeed';
      state.question = action.payload;
    })
    .addCase(fetchAnswer.fulfilled, (state, action) => {
      state.answer = action.payload;
    });
  },
});

export const { cleanMsg } = chatSlice.actions;

export default chatSlice.reducer;

export const selectQuestion = (state) => state.chat.question;
export const selectAnswer = (state) => state.chat.answer;

// export const selectMsg = (state) => {
//   const question = selectQuestion(state);
//   const answer = selectAnswer(state);
//   return [...question, ...answer];
// };

