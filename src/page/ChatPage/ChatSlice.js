import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../api/server';

const initialState = {
  question: {
    questionId: 1,
    questionTitle: '加载中',
    questionContent: '...',
    questionLevel: 1,
  },
  answer: [],
  status: 'idle',
};

export const fetchQuestion = createAsyncThunk('question/fetchQuestion', async(questionId) => {
  const response = await http.get('/training/question/getQuestionDetail', { questionId });
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
    addMsg(state, action) {
      state.answer = action.payload;
    },
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
    });
  },
});

export const { addMsg, cleanMsg } = chatSlice.actions;

export default chatSlice.reducer;

export const selectQuestion = (state) => state.chat.question;
export const selectAnswer = (state) => state.chat.answer;

