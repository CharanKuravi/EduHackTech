// server/modules/auth/auth.routes.js
const express = require('express');
const router = express.Router();
const { register, login, checkEmail } = require('./auth.controller'); // Import checkEmail

router.post('/register', register);
router.post('/login', login);
router.post('/check-email', checkEmail); // New Route

module.exports = router;