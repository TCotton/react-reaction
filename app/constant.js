import localForage from 'localforage';

const UNIVERSAL = {
  ROOT_URL: 'http://localhost:3090',
  SEARCH_URL: 'api/search',
  SIGNIN: 'api/signin',
  SIGNUP: 'api/signup',
  USERS_URL: 'api/users',
  PERSIST_KEY: 'reactReaction'
};

if (process.env.NODE_ENV !== 'production') {
  UNIVERSAL.ROOT_URL = 'http://localhost:3090';
} else {
  UNIVERSAL.ROOT_URL = window.location.origin;
}

UNIVERSAL.persistConfigAuth = { storage: localForage, serial: true, whitelist: 'auth', keyPrefix: UNIVERSAL.PERSIST_KEY };

export default Object.freeze(UNIVERSAL);
