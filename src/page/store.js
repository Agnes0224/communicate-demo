import { configureStore } from '@reduxjs/toolkit';
import answerReducer from './EvaluatePage/AnswerSlice';
import userSlice from './RankingList/UserSlice';
import chatReducer from './ChatPage/ChatSlice';
import questionReducer from './QuestionList/QuestionSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    answer: answerReducer,
    question: questionReducer,
    user: userSlice,
  },
});
