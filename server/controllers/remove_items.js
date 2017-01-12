const removeItems = require('../models/remove_items.js');

/**
 * @description add ID to post but use update to make sure there is no duplication
 * @param req {object}
 * @param res {object}
 * @param next {function}
 */

exports.remove = function(req, res, next) {

  const postId = Number.parseFloat(req.body.id);

  if (req.body.remove) {

    removeItems.update(
      { id: postId },
      { $setOnInsert: { id: postId } },
      { upsert: true },
      (err, item) => {

        if (err) {
          return next(err);
        }

        return res.send({ 'id': item.id });

      });

  } else {

    removeItems.findOneAndRemove({ id: postId }, (err, doc) => {

      if (err) {
        return next(err);
      }

      return res.send({ 'id': doc.id });

    });

  }

};

/**
 * @description retrieve all post ids that will be excluded from the frontpage UI list
 * @param req {object}
 * @param res {object}
 * @param next {function}
 */

exports.retrieveItems = function (req, res, next) {

  removeItems.find({}, { 'id': 1, '_id': 0 }, (err, items) => {

    if (err) {
      return next(err);
    }

    const item = [];

    items.forEach((i) => {
      item.push(i.id);
    });

    return res.send({ 'ids': item });

  });

};
