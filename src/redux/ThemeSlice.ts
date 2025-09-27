import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  themeMode: 'light' | 'dark';
}

// Read initial theme from localStorage if exists, otherwise default to 'light'
const savedTheme = (localStorage.getItem('themeMode') as 'light' | 'dark') || 'light';

const initialState: ThemeState = {
  themeMode: savedTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.themeMode = action.payload;
      localStorage.setItem('themeMode', action.payload); // save to localStorage
    },
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', state.themeMode); 
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
