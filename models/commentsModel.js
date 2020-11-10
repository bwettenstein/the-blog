const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 1,
  },
  body: {
    type: String,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
