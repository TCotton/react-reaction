/* eslint-disable */
import { expect } from '../../test/test_helper';
import TYPES from '../types';

describe('test constants', () => {

  it('each constant must be a string', () => {

    expect(TYPES.FETCH_GITHUB_DATA).to.be.a('string');
    expect(TYPES.AUTH_USER).to.be.a('string');
    expect(TYPES.UNAUTH_USER).to.be.a('string');
    expect(TYPES.AUTH_ERROR).to.be.a('string');
    expect(TYPES.AUTH_ERROR).to.be.a('string');
    expect(TYPES.FETCH_USERS).to.be.a('string');

  });

  it('must check whether TYPES constant is immutable', () => {

    console.dir(Object.isFrozen(TYPES));

    expect(Object.isFrozen(TYPES)).to.equal(true);

  });

});
/* eslint-enable */
