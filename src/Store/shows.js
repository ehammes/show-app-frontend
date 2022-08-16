import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from 'axios';

const ADD_SHOW = 'ADD_SHOW';
const SET_SHOWS = 'SET_SHOWS';

// creating actions
export const addShow = createAction('ADD_SHOW');
export const setShows = createAction('SET_SHOWS');

export const getShows = () => async (dispatch, getState) => {
  // this will ultimately hit our 'shows' database table
  let response = await axios.get('https://api-js401.herokuapp.com/api/v1/categories');
  dispatch(setShows(response.data.results));
};

// create reducer
const showReducer = createReducer({
  // initial state
  list: [],
}, {
  // adding a show to state
  [ADD_SHOW]: (state, action) => ({
    list: [...state, action.payload]
  }),
  // setting all shows into state from database
  [SET_SHOWS]: (state, action) => ({
    list: action.payload,
  })
});

export default showReducer;