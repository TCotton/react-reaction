import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { IntlProvider } from 'react-intl';
import './scss/global.scss';

import App from './containers/app';
import Signin from './containers/signin';
import Signout from './containers/signout';
import Signup from './containers/signup';
import Admin from './components/Admin';
import ExcludePopular from './containers/excludePopular';
import SESSION_STORAGE from './util/sessionStorage';
import store from './store';

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

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <IntlProvider locale='en'>
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App} />
        <Route path='/signin' component={Signin} />
        <Route path='/signout' component={Signout} />
        <Route path='/admin' component={Admin} />
        <Route path='/admin/signup' component={Signup} />
        <Route path='/admin/exclude' component={ExcludePopular} />
      </Router>
    </Provider>
  </IntlProvider>, document.querySelector('.container'));

