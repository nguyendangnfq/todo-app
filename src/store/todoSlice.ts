import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { get, ref, update, remove, set } from 'firebase/database';
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

export const addTodoList = createAsyncThunk(
  'todo/addTodo',
  async (newValue: TodoState) => {
    const addValue = {
      ...newValue,
    };

    await set(ref(db, '/todo/' + newValue.id), addValue);
    return addValue;
  },
);

export const removeTodo = createAsyncThunk(
  'todo/removeTodo',
  async (id: number) => {
    await remove(ref(db, `/todo/${id}`));
    return { data: 'success' };
  },
);

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async ({ id, data }: any) => {
    await update(ref(db, `/todo/${id}`), { ...data });
    return { id, data };
  },
);

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
      })
      .addCase(fetchToDoList.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchToDoList.fulfilled, (state, action) => {
        let fetchData = action.payload;
        state.originalState = fetchData;
      })

      .addCase(addTodoList.pending, state => {
        state.loading = true;
      })
      .addCase(addTodoList.rejected, state => {
        state.loading = false;
      })
      .addCase(addTodoList.fulfilled, (state, action) => {
        state.originalState.unshift(action.payload);
        state.loading = false;
      })

      .addCase(removeTodo.pending, state => {
        state.loading = true;
      })

      .addCase(removeTodo.rejected, state => {
        state.loading = false;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.originalState = state.originalState.filter(
          item => item.id !== action.payload,
        );
      })

      .addCase(updateTodo.pending, state => {
        state.loading = true;
      })
      .addCase(updateTodo.rejected, state => {
        state.loading = false;
      })
      .addCase(updateTodo.fulfilled, (state, { payload }) => {
        state.loading = false;

        const editedKanban = payload.data;

        const taskIndex = state.originalState.findIndex(
          item => item.id === editedKanban.id,
        );

        if (taskIndex >= 0) {
          state.originalState.splice(taskIndex, 1, editedKanban);
        }
      });
  },
});

export const { createTask, completedTask, removeTask, editedTask, updateTask } =
  todoSlice.actions;

export default todoSlice.reducer;
