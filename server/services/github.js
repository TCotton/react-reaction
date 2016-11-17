const GITHUB = require('octonode');

const CONFIG = require('../config');

function githubSearch(callback) {

  const query = 'react';
  const inWhere = 'file,path';
  const url = `https://api.github.com/search/repositories?q=${query}+in:${inWhere}`;

  const client = GITHUB.client({
    id: CONFIG.CLIENT_ID,
    secret: CONFIG.CLIENT_SECRET
  });

  const ghsearch = client.search();

  ghsearch.repos({
    q: 'react+in:file,path'
  }, callback);

}

module.exports.search = function (req, res, next) {

  /*  const query = 'react';
   const inWhere = 'file,path';
   const url = `https://api.github.com/search/repositories?q=${query}+in:${inWhere}`;*/

  // handle connection errors of the requestf

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