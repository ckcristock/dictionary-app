// src/app/store/fontSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Font = "serif" | "sans" | "mono";

const fontSlice = createSlice({
  name: "font",
  initialState: "serif" as Font,
  reducers: {
    setFont: (_, action: PayloadAction<Font>) => action.payload,
  },
});

export const { setFont } = fontSlice.actions;
export default fontSlice.reducer;
