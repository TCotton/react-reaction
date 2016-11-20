import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import githubReducer from './github_reducer';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  popular: githubReducer,
  auth: authReducer,
  form
});

export default rootReducer;
