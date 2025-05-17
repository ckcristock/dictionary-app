// src/app/store/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";
export type Font = "serif" | "sans" | "mono";

interface ThemeState {
  theme: Theme;
  font: Font;
}

const initialState: ThemeState = {
  theme:
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  font: "serif",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setFont: (state, action: PayloadAction<Font>) => {
      state.font = action.payload;
    },
  },
});

export const { setTheme, toggleTheme, setFont } = themeSlice.actions;
export default themeSlice.reducer;
