"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

interface tweet {
  pfp: StaticImageData;
  displayName: string;
  username: string;
  timestamp: string;
  content: string;
}

const initialState: tweet[] = [];

const timeline = createSlice({
  initialState,
  name: "timeline",
  reducers: {
    setTimeline: (state, action: PayloadAction<tweet>) => {
      state.push(action.payload);
    },
  },
});

export const { setTimeline } = timeline.actions;

export default timeline.reducer;
