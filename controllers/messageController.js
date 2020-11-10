const Message = require('../models/messageModel');
const Comment = require('../models/commentsModel');
const { body, validationResult } = require('express-validator');

// Gets all of the messages saved in the DB
// Renders the page with all the messages
exports.getAllMessages = (req, res, next) => {
  Message.find({}, 'title text timestamp', (err, messageList) => {
    if (err || !messageList) return next(err);
    return res.render('messageList', { messageList });
  });
};

// Gets the specific message that matches the id in the url
// If there's no valid id, render the error
// Render the message and the comments that it matches to.
// Also renders the form for users to make comments
exports.getMessage = async (req, res, next) => {
  try {
    const messageId = req.params.id;
    const commentList = await Comment.find({}).catch;
    const message = await Message.findById(messageId);
    if (!message || !commentList) return next(err);
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
    const comment = new Comment({
      name,
      body,
    });
    comment.save();
    return res.redirect(req.originalUrl);
  },
];
