import serialize from 'serialize-javascript';
import deepFreeze from 'deep-freeze';

function loadState() {

  try {
    const serialisedState = sessionStorage.getItem('state');

    if (Object.is(serialisedState, null)) {
      return undefined;
    }

    return JSON.parse(serialisedState);

  } catch (err) {
    return undefined;
  }

}

function saveState(state) {

  try {
    const serialisedState = serialize(state);

    sessionStorage.setItem('state', serialisedState);
    return true;

  } catch (err) {
    return undefined;

  }

}

const SESSION_STORAGE = {
  loadState,
  saveState
};

export default deepFreeze(SESSION_STORAGE);
