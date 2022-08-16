import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from 'axios';

const ADD_REVIEW = 'ADD_REVIEW';
const SET_REVIEWS = 'SET_REVIEWS';

// creating actions
export const addReview = createAction('ADD_REVIEW');
export const setReviews = createAction('SET_REVIEWS');

export const getReviews = () => async (dispatch, getState) => {
  // this will ultimately hit our 'reviews' database table
  let response = await axios.get('https://api-js401.herokuapp.com/api/v1/products');
  console.log(response.data);
  dispatch(setReviews(response.data.results));
};

// create reducer
const reviewReducer = createReducer({
  // initial state
  list: [],
}, {
  // adding a review to state
  [ADD_REVIEW]: (state, action) => ({
    list: [...state, action.payload]
  }),
  // setting all reviews into state from database
  [SET_REVIEWS]: (state, action) => ({
    list: action.payload,
  })
});

export default reviewReducer;