import TYPES from '../actions/types';

export default function (state = {}, action = null) {

  switch (action.type) {

    case TYPES.FETCH_GITHUB_DATA:

      return Object.assign({}, state, action.payload);

    case TYPES.FETCH_GITHUB_DATA_REMOVED:

      return Object.assign({}, state, action.payload);

    default:

      return state;

  }

}
