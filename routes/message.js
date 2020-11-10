const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

// GET request
// Grabs all of the existing messages and renders them on the page
router.get('/', messageController.getAllMessages);

// GET request
// Grabs the message that matches the message id in the URL and renders it on the page. It also renders the comments that the specific message has
router.get('/:id', messageController.getMessage);

// POST request
// Verifies comment form info with express-validator methods. Saves the comment to DB if it's validated, and then re-renders the page with the new comment.
router.post('/:id', messageController.makeComment);

module.exports = router;
