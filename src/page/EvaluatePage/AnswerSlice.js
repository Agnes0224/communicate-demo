import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answers: [
    {
      userId: 1,
      userName: 'user1',
      content: '回答balabala',
    },
    {
      userId: 2,
      userName: 'user2',
      content: '回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala',
    },
  ],
  status: 'idle',
};

export const AnswerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {},
});

export default AnswerSlice.reducer;

export const selectAnswers = (state) => state.answer.answers;
