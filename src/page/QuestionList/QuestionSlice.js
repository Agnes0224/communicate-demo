/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../api/server';

const initialState = {
  questions: [],
  status: 'idle',
};

// 获取问题
export const fetchQuestion = createAsyncThunk('question/fetchquestion', async(params) => {
  const response = await http.get('/training/question/list', params);
  // console.log(response);
  return response.data.data.data;
});

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    handleQuestionAction(state, action) {
      const { actionType, actionAimId, type } = action.payload;
      const question = state.questions.find(question => question.questionId === actionAimId);
      switch (actionType) {
        case 0:
          question.favoriteState = 0;
          question.favorite = question.favorite + 1;
          break;
        case 1:
          question.favoriteState = 1;
          question.favorite = question.favorite - 1;
          break;
        case 2:
          question.like = question.like + 1;
          if (question.likeState === 5) {
            question.unLike = question.unLike - 1;
          }
          question.likeState = 2;
          break;
        case 3:
          question.likeState = 3;
          if (type === 'like') {
            question.like = question.like - 1;
          } else {
            question.unLike = question.unLike - 1;
          }
          break;
        case 5:
          question.unLike = question.unLike + 1;
          if (question.likeState === 2) {
            question.like = question.like - 1;
          }
          question.likeState = 5;
      }
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchQuestion.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchQuestion.fulfilled, (state, action) => {
      state.questions = action.payload;
      state.status = 'succeed';
    });
  },
});

export default questionSlice.reducer;

export const { handleQuestionAction } = questionSlice.actions;

export const selectQuestions = (state) => state.question.questions;
export const selectQuestionById = (state, questionId) => state.question.questions.find(question => question.questionId === questionId);
