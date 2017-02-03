import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { IntlProvider } from 'react-intl';
import './scss/global.scss';
import store from './store';

import App from './containers/app';
import Signin from './containers/signin';
import Signout from './containers/signout';
import Signup from './containers/signup';
import Included from './containers/included_posts';
import Excluded from './containers/excluded_posts';
import Admin from './components/Admin';
import ExcludePopular from './containers/included';
import ExcludedPosts from './containers/excluded';
import RequireAuth from './containers/authentication';

function debug() {

  const axe = require('react-axe'); // eslint-disable-line
  const SESSION_STORAGE = require('./util/sessionStorage'); // eslint-disable-line

  axe(React, ReactDOM, 1000);

  // create basic local data cache for the most popular posts
  store.subscribe(() => {

    if (Object.keys(store.getState().popular).length > 0) {
      SESSION_STORAGE.default.saveState(store.getState().popular);
    }

  });

}

debug();

ReactDOM.render(
  <IntlProvider locale='en'>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App} />
        <Route path='/signin' component={Signin} />
        <Route path='/admin' component={RequireAuth(Admin)} />
        <Route path='/admin/signup' component={RequireAuth(Signup)} />
        <Route path='/admin/signout' component={RequireAuth(Signout)} />
        <Route path='/admin/exclude' component={RequireAuth(Included(ExcludePopular))} />
        <Route path='/admin/include' component={RequireAuth(Excluded(ExcludedPosts))} />
      </Router>
    </Provider>
  </IntlProvider>, document.querySelector('.container'));

