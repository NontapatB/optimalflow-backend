const express = require('express');
const { postUser, postLogin, getUsers, getUserByIdHandler } = require('../controllers/userController');

const router = express.Router();

router.post('/users', postUser);

router.post('/login', postLogin);

router.get('/users', getUsers);

router.get('/users/:id', getUserByIdHandler);

module.exports = router;
