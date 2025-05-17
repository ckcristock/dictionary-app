import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import fontReducer from "./fontSlice";
import dictionaryReducer from "./dictionarySlice";

const saveHistoryMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    const result = next(action);
    const state = storeAPI.getState();

    if (typeof window !== "undefined") {
      if (action.type === "dictionary/clearHistory") {
        localStorage.removeItem("searchHistory");
      } else if (action.type.startsWith("dictionary/")) {
        localStorage.setItem(
          "searchHistory",
          JSON.stringify(state.dictionary.history)
        );
      }
    }

    return result;
  };

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    font: fontReducer,
    dictionary: dictionaryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveHistoryMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
