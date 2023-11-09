"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface selectedPage {
  selected:
    | "home"
    | "explore"
    | "notifications"
    | "messages"
    | "lists"
    | "bookmarks"
    | "profile"
    | "more";
}

const initialState: selectedPage = {
  selected: "home",
};

export const selectedSlice = createSlice({
  initialState,
  name: "selectedPage",
  reducers: {
    setSelection: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setSelection } = selectedSlice.actions;

export default selectedSlice.reducer;
