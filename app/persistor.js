import { persistStore } from 'redux-persist';
import UNIVERSAL from './constant';
import store from './store';
import ACTIONS from './actions/types';

const persistor = persistStore(store, UNIVERSAL.persistConfigAuth, (err, state) => {

  if (err) {
    return null;
  }

  if (typeof state.auth !== 'undefined' && state.auth.token) {
    store.dispatch({
      type: ACTIONS.AUTH_USER,
      payload: state.auth.token
    });

  }

  return true;

});

export default persistor;
