import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';

import reducers from './reducers';

const logger = createLogger();
const middleWare = [reduxThunk, logger];

const createStoreWithMiddleware = compose(applyMiddleware(...middleWare), autoRehydrate())(createStore);

const store = createStoreWithMiddleware(reducers);

export default store;
