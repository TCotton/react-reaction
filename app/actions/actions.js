import axios from 'axios';
import { browserHistory } from 'react-router';
import { getStoredState } from 'redux-persist';
import TYPES from './types';
import UNIVERSAL from '../constant';
import SESSION_STORAGE from '../util/sessionStorage';
import store from '../store';

class ErrorMessage {

  static displayMessage({ email, password }, url, dispatch) {

    // submit email/password to the server

    axios.post(`${UNIVERSAL.ROOT_URL}\\${url}`, { email, password }).then((response) => {

      // if request is good...
      // - Update state to indicate user is authenticated
      dispatch({
        type: TYPES.AUTH_USER,
        payload: response.data.token
      });

      // - redirect to the route './feature'
      browserHistory.push('/');

    }).catch((response) => {

      // if request is bad
      dispatch(authError(response.message));

    });

  }

}

// TODO: refactor the creation of checkbox unique identifiers to either server-side or in the

function fetchGitHubData() {

  return function (dispatch) {

    if (typeof SESSION_STORAGE.loadState() !== 'undefined' && Object.keys(SESSION_STORAGE.loadState()).length > 0) {

      // temp solution

      const checkboxes = SESSION_STORAGE.loadState().results.map((item) => { // eslint-disable-line max-len, arrow-body-style
        return `${item.name.toLowerCase()}-${item.id}`;
      });

      dispatch({
        type: TYPES.FETCH_GITHUB_DATA,
        payload: Object.assign({}, SESSION_STORAGE.loadState(), { checkboxes })
      });

    } else {

      axios.get(`${UNIVERSAL.ROOT_URL}\\${UNIVERSAL.SEARCH_URL}`).then((response) => {

        // temp solution

        const checkboxes = response.data.results.map((item) => { // eslint-disable-line max-len, arrow-body-style
          return `${item.name.toLowerCase()}-${item.id}`;
        });

        dispatch({
          type: TYPES.FETCH_GITHUB_DATA,
          payload: Object.assign({}, response.data, { checkboxes })
        });

      });

    }

  };

}

function signinUser({ email, password }) {

  return function (dispatch) {

    ErrorMessage.displayMessage({
      email, password
    }, UNIVERSAL.SIGNIN, dispatch);

  };

}

function signupUser({ email, password }) {

  return function (dispatch) {

    ErrorMessage.displayMessage({
      email, password
    }, UNIVERSAL.SIGNUP, dispatch);

  };

}

function authError(error) {

  return {
    type: TYPES.AUTH_ERROR,
    payload: error
  };

}

function signoutUser() {

  return {
    type: TYPES.UNAUTH_USER
  };

}

function fetchMessage() {
  let auth = null;

  getStoredState(store, (err, state) => {
    if (err) {
      return false;
    }
    auth = state.auth.token;
    return true;
  });

  return function (dispatch) {

    axios.get(UNIVERSAL.USERS_URL, {
      headers: {
        authorization: auth
      }
    }).then((response) => {

      dispatch({
        type: TYPES.FETCH_MESSAGE,
        payload: response.data.message
      });

    });

  };

}

function fetchUsers() {

  return function (dispatch) {

    axios.get(`${UNIVERSAL.ROOT_URL}\\${UNIVERSAL.USERS_URL}`).then((response) => {

      dispatch({
        type: TYPES.FETCH_USERS,
        payload: response.data
      });

    });

  };

}

function formUpdate(id) {

  console.log('formUpdate');
  console.dir(id);

  return {
    type: TYPES.FORM_UPDATE_VALUE,
    payload: id
  };

}

function formReset() {

  return dispatch => dispatch({
    type: TYPES.FORM_RESET
  });

}

const ACTIONS = {
  fetchGitHubData,
  signinUser,
  signupUser,
  signoutUser,
  fetchMessage,
  fetchUsers,
  formUpdate,
  formReset
};

export default ACTIONS;
