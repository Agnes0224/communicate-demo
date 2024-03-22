import { configureStore } from '@reduxjs/toolkit';
import answerReducer from '../redux/AnswerSlice';
import userReducer from './UserPage/UserSlice';
import chatReducer from './ChatPage/ChatSlice';
import questionReducer from '../redux/QuestionSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    answer: answerReducer,
    question: questionReducer,
    user: userReducer,
  },
});
