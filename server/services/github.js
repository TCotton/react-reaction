const GITHUB = require('octonode');

const CONFIG = require('../config');

function githubSearch(callback) {

  const query = 'react+NOT+facebook';
  const inWhere = 'title,body';
  const language = 'js';
  const sort = 'stars';
  const repoExclude = 'facebook';
  const is = 'public';

  const client = GITHUB.client({
    id: CONFIG.CLIENT_ID,
    secret: CONFIG.CLIENT_SECRET
  });

  const ghsearch = client.search();

  ghsearch.repos({
    q: `${query}+in:${inWhere}+language:${language}+-repo:${repoExclude}+is:${is}&sort=${sort}`
  }, callback);

}

module.exports.search = (req, res, next) => {

  githubSearch((err, JSONObject) => {

    if (err) {
      return next(err);
    }

    return res.send({
      totalCount: JSONObject['total_count'],
      results: JSONObject['items']
    });

  });

};
