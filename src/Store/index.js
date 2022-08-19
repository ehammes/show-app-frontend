import { configureStore } from "@reduxjs/toolkit";
import reviewReducer from "./reviews";
import showReducer from "./shows";
import userReducer from "./users";

export default function createStore() {
  return configureStore({
    reducer: {
      shows: showReducer,
      reviews: reviewReducer,
      users: userReducer
    }
  });
}