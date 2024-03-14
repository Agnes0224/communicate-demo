import { configureStore } from '@reduxjs/toolkit';
import answerReducer from './EvaluatePage/AnswerSlice';
import userSlice from './RankingList/UserSlice';
import chatSlice from './ChatPage/ChatSlice';

export const store = configureStore({
  reducer: {
    chat: chatSlice,
    answer: answerReducer,
    user: userSlice,
  },
});
