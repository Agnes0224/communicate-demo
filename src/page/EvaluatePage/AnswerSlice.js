/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../api/server';

const initialState = {
  answers: [
    {
      answerUserId: 1,
      answerId: 1,
      userName: 'user1',
      answerContent: '回答balabala',
      like: 231,
      unLike: 21,
      favorite: 3411,
      answerScore: 100,
      likeState: 2,
      favoriteState: 0,
    },
    {
      answerUserId: 2,
      answerId: 2,
      userName: 'user2',
      answerContent: '回答balabala回答balabala',
      like: 231,
      unLike: 12,
      favorite: 121,
      likeState: 5,
      favoriteState: 1,
      answerScore: 91,
    },
  ],
  count: '',
  evaluate: [],
  status: 'idle',
};

// 获取评价
export const fetchEvaluate = createAsyncThunk('evaluate/fetchEvaluate', async(answerId) => {
  const response = await http.get('/training/answer/ai', { answerId });
  return response.data.data;
});

// 获取更多回答
export const fetchAnswer = createAsyncThunk('answer/fetchAnswer', async(params) => {
  const response = await http.get('/training/answer/getQuestionAnswers', params);
  // console.log(response);
  return response.data.data;
});

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    handleAnswerAction(state, action) {
      const { actionType, actionAimId, type } = action.payload;
      const answer = state.answers.find(answer => answer.answerId === actionAimId);
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
          answer.likeState = 3;
          if (type === 'like') {
            answer.like = answer.like - 1;
          } else {
            answer.unLike = answer.unLike - 1;
          }
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
    });
  },
});

export default answerSlice.reducer;

export const { handleAnswerAction } = answerSlice.actions;

export const selectAnswers = (state) => state.answer.answers;
export const selectEvaluate = (state) => state.answer.evaluate;
export const selectStatus = (state) => state.answer.status;
export const selectCount = (state) => state.answer.count;
export const selectAnswerById = (state, answerId) => state.answer.answers.find(answer => answer.answerId === answerId);
