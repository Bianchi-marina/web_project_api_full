const express = require('express');
const fs = require('fs');
const router = express.Router();
const { getAllUsers, getUserById, updateUserProfile, getCurrentUser, createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const verifyId = require('../middlewares/verifyId');

router.get('/', auth, getAllUsers);
router.get('/me', auth, getCurrentUser);
router.get('/:id', auth, verifyId, getUserById);
router.patch('/me', auth, updateUserProfile);
router.post('/signup', createUser);
router.post('/signin', login);
module.exports = router;