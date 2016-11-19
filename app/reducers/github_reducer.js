import TYPES from '../actions/types';

export default function (state = [], action = null) {

  switch (action.type) {

    case TYPES.FETCH_GITHUB_DATA:

      return action.payload;

    default:

      return state;

  }

}
