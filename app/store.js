import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';

import reducers from './reducers';

const middleWare = [reduxThunk];

let composeEnhancers = compose;

function debug() {
  composeEnhancers = require('redux-devtools-extension').composeWithDevTools; // eslint-disable-line
  middleWare.push(require('redux-logger')()); // eslint-disable-line
}

debug();

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middleWare), autoRehydrate())(createStore);

const store = createStoreWithMiddleware(reducers);

export default store;
