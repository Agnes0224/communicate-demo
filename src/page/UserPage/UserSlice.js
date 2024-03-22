/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../api/server';

const initialState = {
  questions: [],
  status: 'idle',
};

// 获取个人中心点赞/点踩问题
export const fetchUserLike = createAsyncThunk('UserQuestion/fetchUserQuestion', async(params) => {
  const response = await http.get('/training/user/getUserLikeOrNo', params);
  return response.data.data.data;
});

// 获取个人中心收藏问题
export const fetchUserFavorite = createAsyncThunk('UserFavoriteQuestion/fetchUserFavoriteQuestion', async(params) => {
  const response = await http.get('/training/user/getUserFavorites', params);
  return response.data.data.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleAction(state, action) {
      const { actionType, actionAimId } = action.payload;
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
          if (question.likeState === 2) {
            question.like = question.like - 1;
          } else {
            question.unLike = question.unLike - 1;
          }
          question.likeState = 3;
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
    .addCase(fetchUserLike.fulfilled, (state, action) => {
      const questions = [];
      action.payload.forEach(item => {
        // questions.push(item.question);
        questions.push(item.question);
      });
      state.questions = questions;
    })
    .addCase(fetchUserFavorite.fulfilled, (state, action) => {
      const questions = [];
      action.payload.forEach(item => {
        // questions.push(item.question);
        questions.push(item.question);
      });
      state.questions = questions;
    });
  },
});

export default userSlice.reducer;

export const { handleQuestionAction } = userSlice.actions;

export const selectQuestions = (state) => state.question.questions;
