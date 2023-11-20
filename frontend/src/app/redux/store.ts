"use client";

import { configureStore } from "@reduxjs/toolkit";
import selectedPageReducer from "./slices/selectedPage";
import timelineReducer from "./slices/timeline";

export const store = configureStore({
  reducer: {
    selectedPage: selectedPageReducer,
    timeline: timelineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
