const removeItems = require('../models/remove_items.js');

exports.remove = function(req, res, next) {

  const postId = Number.parseFloat(req.body.id);

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

};
