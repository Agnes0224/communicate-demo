/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../api/server';

const initialState = {
  answers: [
    {
      answerUserId: 1,
      userName: 'user1',
      answerContent: '回答balabala',
      like: 231,
      unLike: 21,
      favorite: 3411,
      answerScore: 100,
    },
    {
      answerUserId: 2,
      userName: 'user2',
      answerContent: '回答balabala回答balabala',
      like: 231,
      unLike: 12,
      favorite: 121,
      isLike: 1,
      isUnLike: 0,
      isFavorite: 1,
      answerScore: 91,
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
  const response = await http.get('/training/answer/getQuestionAnswers', params);
  // console.log(response);
  return response.data.data.data;
});

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    handleHighlight(state, action) {
      const { answerUserId, type } = action.payload;
      const answer = state.answers.find(answer => answer.answerUserId === answerUserId);
      switch (type) {
        case 'like':
          if (answer.isUnLike) {
            answer.isUnLike = false;
            answer.unLike = answer.unLike - 1;
            answer.like = answer.like + 1;
          } else if (answer.isLike) {
            answer.like = answer.like - 1;
          } else {
            answer.like = answer.like + 1;
          }
          answer.isLike = !answer.isLike;
          break;
        case 'unLike':
          if (answer.isLike) {
            answer.isLike = false;
            answer.like = answer.like - 1;
            answer.unLike = answer.unLike + 1;
          } else if (answer.isUnLike) {
            answer.unLike = answer.unLike - 1;
          } else {
            answer.unLike = answer.unLike + 1;
          }
          answer.isUnLike = !answer.isUnLike;
          break;
        case 'favorite':
          answer.isFavorite = !answer.isFavorite;
          if (answer.isFavorite) {
            answer.favorite = answer.favorite + 1;
          } else {
            answer.favorite = answer.favorite - 1;
          }
          break;
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
      state.answers = state.answers.concat(action.payload);
      state.status = 'succeed';
    });
  },
});

export default answerSlice.reducer;

export const { handleHighlight } = answerSlice.actions;

export const selectAnswers = (state) => state.answer.answers;
export const selectEvaluate = (state) => state.answer.evaluate;
export const selectStatus = (state) => state.answer.status;
