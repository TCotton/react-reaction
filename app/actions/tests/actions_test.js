import { expect } from '../../test/test_helper';
import TYPES from '../types';
import ACTIONS from '../actions';

describe('test fetchGitHubData', () => {

  it('has the correct type', () => {

    const action = ACTIONS.fetchGitHubData();

    expect(action.type).to.equal(TYPES.FETCH_GITHUB_DATA);

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

    const action = ACTIONS.fetchMessage();

    expect(action.type).to.equal(TYPES.FETCH_MESSAGE);

  });

});

describe('test fetchUsers', () => {

  it('has the correct type', () => {

    const action = ACTIONS.fetchUsers();

    expect(action.type).to.equal(TYPES.FETCH_USERS);

  });

});


/*

 const ACTIONS = {
 fetchGitHubData,
 signinUser,
 signupUser,
 signoutUser,
 fetchMessage,
 fetchUsers
 };

 */