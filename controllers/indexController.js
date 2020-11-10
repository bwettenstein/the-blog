const Message = require('../models/messageModel');

// Gets the first message and renders it onto the home page.
exports.loadIndex = (req, res, next) => {
  let firstMessage;
  Message.find({}, 'title text user timestamp', (err, foundMessages) => {
    if (err) return next(err);
    firstMessage = foundMessages[0];
    return res.render('index', { newestMessage: firstMessage });
  });
};
