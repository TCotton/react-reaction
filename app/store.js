import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

const logger = createLogger();
const middleWare = [reduxThunk, logger];

const composeEnhancers = (process.env.NODE_ENV !== 'production') ? composeWithDevTools : compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middleWare), autoRehydrate())(createStore);

const store = createStoreWithMiddleware(reducers);

export default store;
