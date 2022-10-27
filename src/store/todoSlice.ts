import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

export type TodoState = {
  title: string;
  description: string | number | Array<string>;
  priority: string;
};

const initialState: TodoState[] = [
  {
    title: 'Reading',
    description: 'Read the Harry Potter Book',
    priority: 'medium',
  },
  {
    title: 'Gaming',
    description: 'Play Spiderman on PS5 ',
    priority: 'low',
  },
];

const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    createTask: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { createTask } = todoSlice.actions;

export default todoSlice.reducer;
