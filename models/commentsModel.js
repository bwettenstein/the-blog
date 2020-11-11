const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

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
  message: {
    type: String,
    required: true,
    min: 1,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

CommentSchema.virtual('formattedTimestamp').get(function () {
  return moment(this.timestamp).format('h:mm a, MMM Do YYYY');
});

module.exports = mongoose.model('Comment', CommentSchema);
