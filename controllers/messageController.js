const Message = require('../models/messageModel');
const Comment = require('../models/commentsModel');
const { body, validationResult } = require('express-validator');

// Gets all of the messages saved in the DB
// Renders the page with all the messages
exports.getAllMessages = (req, res, next) => {
  Message.find({}, 'title text timestamp', (err, messageList) => {
    if (err) return res.send(err.message);
    return res.render('messageList', { messageList });
  }).catch((err) => res.send(err.message));
};

// Gets the specific message that matches the id in the url
// If there's no valid id, render the error
// Render the message and the comments that it matches to.
// Also renders the form for users to make comments
exports.getMessage = async (req, res, next) => {
  try {
    const messageId = req.params.id;
    const commentList = await Comment.find({
      message: messageId,
    });
    const message = await Message.findById(messageId);
    if (!message) return res.sendStatus(404);
    return res.render('message', { message: message, commentList });
  } catch (err) {
    return next(err);
  }
};

// Validates the comment form fields.
// Saves the current url and redirects to it
// This basically makes a get request, and executes the getMessage method that's above
exports.makeComment = [
  body('name').isString().not().isEmpty().trim().escape(),
  body('comment').isString().not().isEmpty().trim().escape(),
  (req, res) => {
    const name = req.body.name;
    const body = req.body.comment;
    // Id of the message you're leaving a comment on
    const message = req.params.id;
    const comment = new Comment({
      name,
      body,
      message,
    });
    comment.save();
    return res.redirect(req.originalUrl);
  },
];
