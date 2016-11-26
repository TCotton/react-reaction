import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { IntlProvider } from 'react-intl';
import { persistStore } from 'redux-persist';
import './scss/global.scss';

import App from './containers/app';
import Signin from './containers/signin';
import Signout from './containers/signout';
import Signup from './containers/signup';
import Admin from './components/Admin';
import ACTIONS from './actions/types';
import ExcludePopular from './containers/excludePopular';
import SESSION_STORAGE from './util/sessionStorage';
import store from './store';
import UNIVERSAL from './constant';

if (process.env.NODE_ENV !== 'production') {
  const axe = require('react-axe'); // eslint-disable-line

  axe(React, ReactDOM, 1000);
}

persistStore(store, UNIVERSAL.persistConfigAuth, (err, state) => {

  if (err) {
    return null;
  }

  if (state.auth.token) {

    store.dispatch({
      type: ACTIONS.AUTH_USER,
      payload: state.auth.token
    });

  }

  return true;

});

if (process.env.NODE_ENV !== 'production') {
  const axe = require('react-axe'); // eslint-disable-line

  axe(React, ReactDOM, 1000);

  // create basic local data cache for the most popular posts
  store.subscribe(() => {

    if (Object.keys(store.getState().popular).length > 0) {
      SESSION_STORAGE.saveState(store.getState().popular);
    }

  });

}

ReactDOM.render(
  <IntlProvider locale='en'>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App} />
        <Route path='/signin' component={Signin} />
        <Route path='/signout' component={Signout} />
        <Route path='/admin' component={Admin} />
        <Route path='/admin/signup' component={Signup} />
        <Route path='/admin/exclude' component={ExcludePopular} />
      </Router>
    </Provider>
  </IntlProvider>, document.querySelector('.container'));

