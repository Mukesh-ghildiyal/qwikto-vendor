const express = require('express');
const { registerUser } = require('../controllers/registerController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', authMiddleware, registerUser);

module.exports = router;
