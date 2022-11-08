import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TodoState = {
  id: number;
  title: string;
  description: string | number | Array<string>;
  priority: string;
  isCompleted: boolean;
};

const initialState = {
  originalState: [
    {
      id: 1,
      title: 'Reading',
      description: 'Read the Harry Potter Book',
      priority: 'medium',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Gaming',
      description: 'Play Spiderman on PS5 ',
      priority: 'low',
      isCompleted: false,
    },
  ],
  completedTaskState: [],
};

const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    createTask: (state, action) => {
      state.originalState.unshift(action.payload);
    },

    updateTask: (state, action) => {
      state.originalState = action.payload;
    },

    removeTask: (state, action) => {
      state.originalState = state.originalState.filter(
        item => item.id !== action.payload,
      );
    },

    completedTask: (state, action: PayloadAction<object>) => {
      state.completedTaskState.unshift(action.payload);
    },

    editedTask: (state, action) => {
      const editedKanban = action.payload;

      const taskIndex = state.originalState.findIndex(
        item => item.id === editedKanban.id,
      );

      if (taskIndex >= 0) {
        state.originalState.splice(taskIndex, 1, editedKanban);
      }
    },
  },
});

export const { createTask, completedTask, removeTask, editedTask, updateTask } =
  todoSlice.actions;

export default todoSlice.reducer;
