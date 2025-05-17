import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Meaning {
  partOfSpeech: string;
  definitions: { definition: string; example?: string; synonyms?: string[] }[];
}

export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics?: { text?: string; audio?: string }[];
  meanings: Meaning[];
  sourceUrls: string[];
}

export interface DictionaryState {
  loading: boolean;
  error: string | null;
  result: DictionaryEntry | null;
  history: { word: string; timestamp: string }[];
}

const initialState: DictionaryState = {
  loading: false,
  error: null,
  result: null,
  history: [], // se cargará desde localStorage en un useEffect en el cliente
};

export const fetchWord = createAsyncThunk(
  "dictionary/fetchWord",
  async (word: string, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!res.ok) throw new Error("Word not found");
      const data = await res.json();
      return data[0] as DictionaryEntry;
    } catch (error: any) {
      return rejectWithValue(error.message || "Unknown error");
    }
  }
);

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    clearHistory(state) {
      state.history = [];
    },
    setHistoryFromStorage(
      state,
      action: PayloadAction<DictionaryState["history"]>
    ) {
      state.history = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWord.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
      })
      .addCase(
        fetchWord.fulfilled,
        (state, action: PayloadAction<DictionaryEntry>) => {
          state.loading = false;
          state.result = action.payload;
          state.history = [
            { word: action.payload.word, timestamp: new Date().toISOString() },
            ...state.history.filter(
              (item) => item.word !== action.payload.word
            ),
          ].slice(0, 10);
        }
      )
      .addCase(fetchWord.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch word";
      });
  },
});

export const { clearHistory, setHistoryFromStorage } = dictionarySlice.actions;
export default dictionarySlice.reducer;
