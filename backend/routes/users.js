const express = require('express');
const fs = require('fs');
const router = express.Router();
const { getAllUsers, getUserById, updateUserProfile, updateUserAvatar, getUserInfo } = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);
router.get('/users/me', getUserInfo);

module.exports = router;