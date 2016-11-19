const GITHUB = require('octonode');

const CONFIG = require('../config');

function githubSearch(callback) {

  const query = 'react';
  const inWhere = 'file,path';
  const language = 'js';
  const sort = 'stars';

  const client = GITHUB.client({
    id: CONFIG.CLIENT_ID,
    secret: CONFIG.CLIENT_SECRET
  });

  const ghsearch = client.search();

  ghsearch.repos({
    q: `${query}+in:${inWhere}+language:${language}&sort=${sort}`
  }, callback);

}

module.exports.search = (req, res, next) => {

  githubSearch((err, JSONObject, headers) => {

    if (err) {
      return next(err);
    }

    return res.send({
      totalCount: JSONObject['total_count'],
      results: JSONObject['items']
    });

  });

};
