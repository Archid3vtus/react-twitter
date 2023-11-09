"use client";

import { configureStore } from "@reduxjs/toolkit";
import selectedPageReducer from "./slices/selectedPage";

export const store = configureStore({
  reducer: {
    selectedPage: selectedPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
