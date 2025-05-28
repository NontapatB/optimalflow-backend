const express = require('express');
const { postUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/userController')

const router = express.Router();

router.post('/users', postUser);

router.post('login', loginUser);

module.exports = router;
