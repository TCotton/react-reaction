import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { IntlProvider } from 'react-intl';
import './scss/global.scss';

import App from './containers/app';
import Signin from './containers/signin';
import Signout from './containers/signout';
import Signup from './containers/signup';
import Form from './containers/form';
import Admin from './components/Admin';
import ExcludePopularTwo from './containers/excludePopularTwo';
import SESSION_STORAGE from './util/sessionStorage';
import store from './store';

if (!Object.is(process.env.NODE_ENV, 'production')) {
  const axe = require('react-axe'); // eslint-disable-line

  axe(React, ReactDOM, 1000);

}

if (!Object.is(process.env.NODE_ENV, 'production')) {

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
        <Route path='/admin/exclude' component={Form(ExcludePopularTwo)} />
      </Router>
    </Provider>
  </IntlProvider>, document.querySelector('.container'));

