import axios from 'axios';
import { browserHistory } from 'react-router';
import TYPES from './types';
import UNIVERSAL from '../constant';

const ROOT_URL = window.location.origin;

/* if (process.env.NODE_ENV !== 'production') {
  ROOT_URL = 'http://localhost:3090';
} */

class ErrorMessage {

  static displayMessage({ email, password }, url, dispatch) {

    // submit email/password to the server

    axios.post(`${ROOT_URL}\\${url}`, { email, password }).then((response) => {

      // if request is good...
      // - Update state to indicate user is authenticated
      dispatch({
        type: TYPES.AUTH_USER
      });
      // - Save the JWT token
      localStorage.setItem('token', response.data.token);
      // - redirect to the route './feature'
      browserHistory.push('/admin');

    }).catch((response) => {

      // if request is bad
      dispatch(authError(response.message));

    });

  }

}

function fetchGitHubData() {

  return function (dispatch) {

    axios.get(`${UNIVERSAL.ROOT_URL}\\${UNIVERSAL.SEARCH_URL}`).then((response) => {

      dispatch({
        type: TYPES.FETCH_GITHUB_DATA,
        payload: response.data
      });

    });

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

  localStorage.removeItem('token');

  return {
    type: TYPES.UNAUTH_USER
  };

}

function fetchMessage() {

  return function (dispatch) {

    axios.get(ROOT_URL, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    }).then((response) => {

      dispatch({
        type: TYPES.FETCH_MESSAGE,
        payload: response.data.message
      });

    });

  };

}

const ACTIONS = {
  fetchGitHubData,
  signinUser,
  signupUser,
  signoutUser,
  fetchMessage
};

export default ACTIONS;
