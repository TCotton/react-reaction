import TYPES from '../actions/types';

// define initial state - an empty form
const initialState = {
  values: {}
};

export default function (state = initialState, action = null) {

  switch (action.type) {

    case TYPES.FORM_UPDATE_VALUE:

      return {
        ...state, id: action.payload
      };

    default:
      return state;
  }

}
