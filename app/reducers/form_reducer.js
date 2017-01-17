import TYPES from '../actions/types';

// define initial state - an empty form
const initialState = {};

export default function (state = initialState, action = null) {

  switch (action.type) {

    case TYPES.FORM_UPDATE_VALUE:

      console.log('FORM_UPDATE_VALUE');
      console.dir(action.payload);

      return { id: action.payload };

    default:
      return state;
  }

}
