import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answers: [
    {
      userId: 1,
      userName: 'user1',
      content: '回答balabala',
      likes: 231,
      stars: 3411,
    },
    {
      userId: 2,
      userName: 'user2',
      content: '回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala回答balabala',
      likes: 231,
      stars: 121,
    },
  ],
  status: 'idle',
};

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {},
});

export default answerSlice.reducer;

export const selectAnswers = (state) => state.answer.answers;
