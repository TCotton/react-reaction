// import thunk from 'redux-thunk';
import nock from 'nock';
import reduxThunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { applyMiddleware } from 'redux';
import { expect } from '../../test/test_helper';
import TYPES from '../types';
import ACTIONS from '../actions';

const middlewares = [reduxThunk];
/**
 * Creates a mock of Redux store with middleware.
 */
function mockStore(getState, expectedActions, onLastAction) {

  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.');
  }

  if (typeof onLastAction !== 'undefined' && typeof onLastAction !== 'function') {
    throw new Error('onLastAction should either be undefined or function.');
  }

  function mockStoreWithoutMiddleware() {

    return {
      getState() {
        return typeof getState === 'function' ? getState() : getState;
      },

      dispatch(action) {

        const expectedAction = expectedActions.shift();

        expect(action).to.equal(expectedAction);

        if (onLastAction && !expectedActions.length) {
          onLastAction();
        }

        return action;
      }

    };

  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware);

  return mockStoreWithMiddleware();
}


describe('test actions', () => {

  let initialState;
  let store;

  beforeEach(() => {

    initialState = {};
    store = mockStore(initialState);

  });

  describe('test fetchGitHubData', () => {

    it('has the correct type', () => {

      // const action = ACTIONS.fetchGitHubData();

      store.dispatch({ type: TYPES.FETCH_GITHUB_DATA });

      const actions = store.getActions();
      const expectedPayload = { type: TYPES.FETCH_GITHUB_DATA };

      expect(actions[0].type).to.equal(expectedPayload.type);

    });

  });

  describe('test signinUser', () => {


  });

  describe('test signupUser', () => {

  });

  describe('test signoutUser', () => {

    it('has the correct type', () => {

      const action = ACTIONS.signoutUser();

      expect(action.type).to.equal(TYPES.UNAUTH_USER);

    });

  });

  describe('test fetchMessage', () => {

    it('has the correct type', () => {

      // const action = ACTIONS.fetchMessage();

      store.dispatch({ type: TYPES.FETCH_MESSAGE });

      const actions = store.getActions();
      const expectedPayload = { type: TYPES.FETCH_MESSAGE };

      expect(actions[0].type).to.equal(expectedPayload.type);

    });

  });

  describe('test fetchUsers', () => {

    it('has the correct type', () => {

      /*   const action = ACTIONS.fetchUsers();

       expect(action.type).to.equal(TYPES.FETCH_USERS);*/

    });

  });

});
