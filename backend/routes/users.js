const express = require('express');
const fs = require('fs');
const router = express.Router();
const authMiddleware  = require('../middlewares/auth');
const { getAllUsers, getUserById, updateUserProfile, updateUserAvatar, getUserInfo } = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);
router.get('users/me', authMiddleware, getUserInfo);

module.exports = router;