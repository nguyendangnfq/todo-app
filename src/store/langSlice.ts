import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLang: 'en',
};

const langSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.currentLang = action.payload;
    },
  },
});

export const { changeLanguage } = langSlice.actions;

export default langSlice.reducer;
