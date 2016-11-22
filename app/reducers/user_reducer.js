import TYPES from '../actions/types';

export default function (state = {}, action = null) {

  switch (action.type) {

    case TYPES.FETCH_USERS:

      return {
        ...state, list: action.payload
      };

    default:

      return state;

  }

}
