import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from 'axios';

const ADD_USER = 'ADD_USER';
const SET_USERS = 'SET_USERS';
const SELECT_USER = 'SELECT_USER';
const SERVER = process.env.REACT_APP_SERVER || 3002;

// creating actions
export const addUser = createAction('ADD_USER');
export const setUsers = createAction('SET_USERS');
export const selectUser = createAction('SELECT_USER');

export const getUsers = () => async (dispatch, getState) => {
  // this will ultimately hit our 'user' database table
  let response = await axios.get(`${SERVER}/user`);
  //let response = await axios.get(`http://localhost:3001/show`);
  // console.log('USER response: ', response.data);
  dispatch(setUsers(response.data));
};

// create reducer
const userReducer = createReducer({
  // initial state
  list: [],
  selectedUser: null,
}, {
  // adding a user to state
  [ADD_USER]: (state, action) => ({
    list: [...state, action.payload]
  }),
  // setting all users into state from database
  [SET_USERS]: (state, action) => ({
    list: action.payload,
  }),
  // setting selected user into state for use by Details component
  [SELECT_USER]: (state, action) => ({
    selectedUser: action.payload,
  }),
});

export default userReducer;