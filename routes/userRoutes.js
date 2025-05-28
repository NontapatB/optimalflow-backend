const express = require('express');
const { postUser, postLogin, getUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/users', postUser);

router.post('/login', postLogin);

router.get('/users', getUsers);

module.exports = router;
