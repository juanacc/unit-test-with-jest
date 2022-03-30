const express = require('express');
const router = express.Router();

const { handleSignUp } = require('../controllers/userController');

router.post('/api/user/sign-up', handleSignUp);

module.exports = router;