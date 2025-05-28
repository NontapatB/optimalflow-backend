const express = require('express');
const { postUser, 
        postLogin, 
        getUsers, 
        getUserByIdHandler, 
        postTransfer } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/users', postUser);

router.post('/login', postLogin);

router.get('/users', getUsers);

router.get('/users/:id', getUserByIdHandler);

router.post('/transfer',authenticateToken ,postTransfer);

module.exports = router;
