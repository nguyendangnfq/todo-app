import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { get, ref } from 'firebase/database';
import { db } from '../../firebase-config.js';

export type TodoState = {
  id: number;
  title: string;
  description: string | number | Array<string>;
  priority: string;
  isCompleted: boolean;
};

export type inittialTypeState = {
  loading: boolean;
  originalState: TodoState[];
  completedTaskState: TodoState[];
};

export const fetchToDoList = createAsyncThunk('todo/fetchAllTodo', async () => {
  try {
    const snapshot = (await (await get(ref(db, '/todo'))).val()) || {};
    const todos = Object.keys(snapshot).map(key => snapshot[key]);
    return todos;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
  loading: false,
  originalState: [],
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

  extraReducers: builder => {
    builder
      .addCase(fetchToDoList.pending, state => {
        state.loading = true;
        console.log('pending');
      })
      .addCase(fetchToDoList.rejected, state => {
        console.log('rejected');
        state.loading = false;
      })
      .addCase(fetchToDoList.fulfilled, (state, action) => {
        console.log('fullfilled');
        let fetchData = action.payload;
        state.originalState = fetchData;
      });
  },
});

export const { createTask, completedTask, removeTask, editedTask, updateTask } =
  todoSlice.actions;

export default todoSlice.reducer;
