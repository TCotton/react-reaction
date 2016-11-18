import { combineReducers } from 'redux';
import githubReducer from './github_reducer';

const rootReducer = combineReducers({
  popular: githubReducer
});

export default rootReducer;
