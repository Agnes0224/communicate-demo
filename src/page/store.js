import { configureStore } from '@reduxjs/toolkit';
import answerReducer from './EvaluatePage/AnswerSlice';

export const store = configureStore({
  reducer: {
    answer: answerReducer,
  },
});
