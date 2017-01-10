import TYPES from '../actions/types';

// define initial state - an empty form
const initialState = {
  values: {}
};

export default function (state = initialState, action = null) {

  switch (action.type) {

    case TYPES.FORM_UPDATE_VALUE:

      console.log(action.type);
      console.log(action.payload);

      return {
        ...state, id: action.payload
      };

    case TYPES.FORM_RESET:
      return initialState;

    default:
      return state;
  }

}
