// src/app/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import fontReducer from "./fontSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    font: fontReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
