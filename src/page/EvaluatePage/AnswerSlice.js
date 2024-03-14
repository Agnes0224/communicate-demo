/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../api/server';

const initialState = {
  answers: [
    {
      answer_user_id: 1,
      userName: 'user1',
      answer_content: '回答balabala',
      like: 231,
      un_like: 21,
      favorite: 3411,
      answer_score: 100,
    },
    {
      answer_user_id: 2,
      userName: 'user2',
      answer_content: '回答balabala回答balabala',
      like: 231,
      un_like: 12,
      favorite: 121,
      answer_score: 91,
    },
  ],
  evaluate: [],
  status: 'idle',
};

// 获取评价
export const fetchEvaluate = createAsyncThunk('evaluate/fetchEvaluate', async(answer_id) => {
  const response = await http.get('/training/answer/ai', { answer_id });
  return response.data.data;
});

// 获取更多回答
export const fetchAnswer = createAsyncThunk('answer/fetchAnswer', async(params) => {
  const response = await http.get('/training/getQuestionAnswers', params);
  console.log(response);
  return response.data.data.records;
});

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchEvaluate.fulfilled, (state, action) => {
      state.evaluate = action.payload;
    })
    .addCase(fetchAnswer.fulfilled, (state, action) => {
      state.answers = state.answers.concat(action.payload);
    });
  },
});

export default answerSlice.reducer;

export const selectAnswers = (state) => state.answer.answers;
export const selectEvaluate = (state) => state.answer.evaluate;
