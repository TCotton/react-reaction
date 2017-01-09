import TYPES from '../actions/types';

// define initial state - an empty form
const initialState = {
  values: {}
};

export default function (state = initialState, action = null) {

  switch (action.type) {

    case TYPES.FORM_UPDATE_VALUE:

      return Object.assign({}, state, { values: Object.assign({}, state.values, { [action.name]: action.value }) });

    case TYPES.FORM_RESET:
      return initialState;

    default:
      return state;
  }

}
