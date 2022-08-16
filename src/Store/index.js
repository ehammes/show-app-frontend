import { configureStore } from "@reduxjs/toolkit";
import reviewReducer from "./reviews";
import showReducer from "./shows";

export default function createStore() {
  return configureStore({
    reducer: {
      shows: showReducer,
      reviews: reviewReducer,
    }
  });
}