import axios from 'axios';

import TYPES from './types';

import UNIVERSAL from '../constant';

function fetchGitHubData() {

  return function (dispatch) {

    axios.get(`${UNIVERSAL.ROOT_URL}\\${UNIVERSAL.SEARCH_URL}`).then((response) => {

      dispatch({
        type: TYPES.FETCH_GITHUB_DATA,
        payload: response.data.message
      });

    });

  };

}

const ACTIONS = {
  fetchGitHubData
};

export default ACTIONS;
