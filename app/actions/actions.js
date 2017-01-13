import axios from 'axios';
import { browserHistory } from 'react-router';
import { getStoredState } from 'redux-persist';
import TYPES from './types';
import UNIVERSAL from '../constant';
// import SESSION_STORAGE from '../util/sessionStorage';
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

function fetchGitHubDataRemoveItems() {
  return axios.get(`${UNIVERSAL.ROOT_URL}\\${UNIVERSAL.RET_REMOVE}`);
}

function fetchGitHubDataAllData() {
  return axios.get(`${UNIVERSAL.ROOT_URL}\\${UNIVERSAL.SEARCH_URL}`);
}

/**
 * @description The GitHub API does not allow the exclusion of individual repros.
 * This has to be manually filtered on either the client or server side
 * @returns {Function}
 */
function fetchGitHubData() {

  return function (dispatch) {

    axios.all([fetchGitHubDataRemoveItems(), fetchGitHubDataAllData()])
      .then(axios.spread((removeItems, allItems) => {

        const remainingItems = {};

        remainingItems.results = allItems.data.results.filter((itemHere) => {
          return !removeItems.data.ids.includes(itemHere.id);
        });

        dispatch({
          type: TYPES.FETCH_GITHUB_DATA,
          payload: Object.assign({}, { results: remainingItems.results, excluded: removeItems.data.ids })
        });

        // Both requests are now complete
      }));

  };

}

function fetchGitHubDataRemovedItems() {

  return function (dispatch) {

    axios.all([fetchGitHubDataRemoveItems(), fetchGitHubDataAllData()])
      .then(axios.spread((removeItems, allItems) => {

        const removedItems = {};

        removedItems.results = allItems.data.results.filter((itemHere) => {
          return removeItems.data.ids.includes(itemHere.id);
        });

        dispatch({
          type: TYPES.FETCH_GITHUB_DATA_REMOVED,
          payload: Object.assign({}, { results: removedItems.results, excluded: removeItems.data.ids })
        });

        // Both requests are now complete
      }));

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

function formUpdate(id, include) {

  return function (dispatch) {

    axios.post(`${UNIVERSAL.ROOT_URL}\\${UNIVERSAL.REMOVE}`, { 'id': id, 'remove': include }).then((response) => {

      if (response.data.id && Object.is(response.status, 200)) {

        dispatch({
          type: TYPES.FORM_UPDATE_VALUE,
          payload: response.data.id
        });

      }

    });

  };

}

const ACTIONS = {
  fetchGitHubData,
  fetchGitHubDataRemovedItems,
  signinUser,
  signupUser,
  signoutUser,
  fetchMessage,
  fetchUsers,
  formUpdate
};

export default Object.freeze(ACTIONS);
