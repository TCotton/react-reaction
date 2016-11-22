import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import './scss/global.scss';

import App from './containers/app';
import Signin from './containers/signin';
import Signout from './containers/signout';
import Signup from './containers/signup';
import Admin from './components/Admin';
import ACTIONS from './actions/types';

import reducers from './reducers';

if (process.env.NODE_ENV !== 'production') {
  const axe = require('react-axe'); // eslint-disable-line

  axe(React, ReactDOM, 1000);
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// of we have a token, consider the user sign in
const token = localStorage.getItem('token');

if (token) {
// we need to update application state
  store.dispatch({
    type: ACTIONS.AUTH_USER
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
      </Router>
    </Provider>
  </IntlProvider>, document.querySelector('.container'));

