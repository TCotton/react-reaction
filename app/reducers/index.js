import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import githubReducer from './github_reducer';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';

const rootReducer = combineReducers({
  popular: githubReducer,
  auth: authReducer,
  users: userReducer,
  form
});

export default rootReducer;