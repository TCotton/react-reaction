const User = require('../models/user');

exports.findUsers = function (req, res, next) {

  User.find({}, (err, users) => {

    if (err) {
      return next(err);
    }

    const userMap = {};

    users.forEach((user) => {
      userMap[user._id] = user;
    });

    res.send(userMap);

  });

};
