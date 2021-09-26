import {combineReducers} from 'redux';
import AuthReducer from '../Redux/AuthReducer';
import todoReducer from '../Redux/TodoReducer';
import {configureStore} from '@reduxjs/toolkit';
const reducer = combineReducers({
  AuthReducer,
  todoReducer
});
const store = configureStore({
  reducer,
});
export default store;
