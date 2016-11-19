import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import a11y from 'react-a11y';

import './scss/global.scss';

import App from './components/app';
import reducers from './reducers';

a11y(React);

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <IntlProvider locale='en'>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App} />
      </Router>
    </Provider>
  </IntlProvider>, document.querySelector('.container'));

