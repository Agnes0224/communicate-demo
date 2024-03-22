/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../api/server';

const initialState = {
  answers: [],
  evaluate: [],
  userQuestions: [],
  count: '',
  status: 'idle',
};

// 获取评价
export const fetchEvaluate = createAsyncThunk('evaluate/fetchEvaluate', async(answerId) => {
  const response = await http.get('/training/answer/ai', { answerId });
  return response.data.data;
});

// 获取最佳回答
export const fetchBestAnswer = createAsyncThunk('bestAnswer/fetchBestAnswer', async(questionId) => {
  const response = await http.get('/training/answer/getBestAnswers', { questionId });
  return response.data.data;
});

// 获取更多回答
export const fetchAnswer = createAsyncThunk('answer/fetchAnswer', async(params) => {
  const response = await http.get('/training/answer/getQuestionAnswers', params);
  // console.log(response);
  return response.data.data;
});

// 获取个人空间问题&回答
export const fetchUserQA = createAsyncThunk('ueserQA/fetchUserQA', async(params) => {
  const response = await http.get('/training/user/getAnsweredQuestion', params);
  return response.data.data.data;
});

// 获取个人中心点赞/点踩问题
export const fetchUserLike = createAsyncThunk('UserAnswer/fetchUserAnswer', async(params) => {
  const response = await http.get('/training/user/getUserLikeOrNo', params);
  return response.data.data.data;
});

// 获取个人中心收藏问题
export const fetchUserFavorite = createAsyncThunk('UserFavoriteANswer/fetchUserFavoriteAnswer', async(params) => {
  const response = await http.get('/training/user/getUserFavorites', params);
  return response.data.data.data;
});

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    handleAnswerAction(state, action) {
      const { actionType, actionAimId } = action.payload;
      console.log(action.payload);
      const answer = state.answers.find(answer => answer.answerId === actionAimId);
      console.log(answer);
      switch (actionType) {
        case 0:
          answer.favoriteState = 0;
          answer.favorite = answer.favorite + 1;
          break;
        case 1:
          answer.favoriteState = 1;
          answer.favorite = answer.favorite - 1;
          break;
        case 2:
          answer.like = answer.like + 1;
          if (answer.likeState === 5) {
            answer.unLike = answer.unLike - 1;
          }
          answer.likeState = 2;
          break;
        case 3:
          if (answer.likeState === 2) {
            answer.like = answer.like - 1;
          } else {
            answer.unLike = answer.unLike - 1;
          }
          answer.likeState = 3;
          break;
        case 5:
          answer.unLike = answer.unLike + 1;
          if (answer.likeState === 2) {
            answer.like = answer.like - 1;
          }
          answer.likeState = 5;
      }
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchEvaluate.fulfilled, (state, action) => {
      state.evaluate = action.payload;
    })
    .addCase(fetchAnswer.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchAnswer.fulfilled, (state, action) => {
      state.answers = state.answers.concat(action.payload.data);
      state.count = action.payload.count;
      state.status = 'succeed';
    })
    .addCase(fetchBestAnswer.fulfilled, (state, action) => {
      const newElements = [];
      if (action.payload.questionCorrect !== undefined) {
        newElements.push(action.payload.questionCorrect);
      }
      if (action.payload.maxLikeAnswer.answerId) {
        newElements.push(action.payload.maxLikeAnswer);
      }
      if (action.payload.maxScoreAnswer.answerId) {
        newElements.push(action.payload.maxScoreAnswer);
      }
      state.answers = [...newElements];
    })
    .addCase(fetchUserQA.fulfilled, (state, action) => {
      const answers = [];
      action.payload.forEach(item => {
        answers.push(...item.answer);
      });
      state.answers = answers;
      state.userQuestions = action.payload;
    })
    .addCase(fetchUserLike.fulfilled, (state, action) => {
      const answers = [];
      console.log(action.payload);
      action.payload.forEach(item => {
        answers.push(...item.answer);
      });
      state.answers = answers;
      state.userQuestions = action.payload;
    })
    .addCase(fetchUserLike.rejected, (state) => {
      state.answers = [];
      state.userQuestions = [];
    })
    .addCase(fetchUserFavorite.fulfilled, (state, action) => {
      if (action.payload === undefined) {
        state.answers = [];
        return;
      }
      const answers = [];
      action.payload.forEach(item => {
        answers.push(...item.answer);
      });
      state.answers = answers;
      state.userQuestions = action.payload;
    });
  },
});

export default answerSlice.reducer;

export const { handleAnswerAction } = answerSlice.actions;

export const selectAnswers = (state) => state.answer.answers;
export const selectAnswersById = (state, answerQuestionId) => state.answer.answers.find(answer => answer.answerQuestionId === answerQuestionId);
export const selectUserQuestions = (state) => state.answer.userQuestions;
export const selectEvaluate = (state) => state.answer.evaluate;
export const selectStatus = (state) => state.answer.status;
export const selectCount = (state) => state.answer.count;
