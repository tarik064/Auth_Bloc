const express = require('express');
const router = express.Router();
const useerController = require('../controllers/user');

//Sign up URL
router.post('/signup', useerController.signupUpNewUser);

module.exports = router;