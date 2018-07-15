import { combineReducers } from 'redux';
import * as authReducer from './AuthReducer'

export default combineReducers(Object.assign(
  authReducer,
));
