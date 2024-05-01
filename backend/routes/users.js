const express = require('express');
const fs = require('fs');
const router = express.Router();
const { getAllUsers, getUserById, updateUserProfile, updateUserAvatar, getCurrentUser, createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const verifyId = require('../middlewares/verifyId');

router.get('/', auth, getAllUsers);
router.get('/me', auth, getCurrentUser);
router.get('/:id', auth, getUserById);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);
router.post('/singup', createUser);
router.post('/singin', login);
module.exports = router;