const express = require('express');
const fs = require('fs');
const router = express.Router();
const { getAllUsers, getUserById, updateUserProfile, updateUserAvatar, getUserInfo, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const verifyId = require('../middlewares/verifyId');

router.get('/', auth, getAllUsers);
router.get('/:id', auth, verifyId, getUserById);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);
router.get('/users/me', getUserInfo);
router.post('/singup', createUser);
module.exports = router;