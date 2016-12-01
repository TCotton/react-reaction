import { REHYDRATE } from 'redux-persist/constants';
import TYPES from '../actions/types';

export default function (state = {}, action = null) {

  switch (action.type) {

    case REHYDRATE: {

      const incoming = action.payload.auth;

      return {
        ...state, ...incoming
      };

    }

    case TYPES.UNAUTH_USER:

      return {
        ...state, authenticated: false, token: ''
      };

    case TYPES.AUTH_USER:

      return {
        ...state, error: '', authenticated: true, token: action.payload
      };

    case TYPES.AUTH_ERROR:

      return {
        ...state, error: action.payload
      };

    case TYPES.FETCH_MESSAGE:

      return {
        ...state, message: action.payload
      };

    default:
      return state;
  }

}
