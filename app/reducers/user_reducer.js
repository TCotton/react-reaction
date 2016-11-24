import TYPES from '../actions/types';

export default function (state = {}, action = null) {

  switch (action.type) {

    case TYPES.FETCH_USERS:

      return Object.assign({}, state, { list: action.payload });

    default:

      return state;

  }

}
