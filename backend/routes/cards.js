const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getAllCards, createCard, deleteCard, likeCard } = require('../controllers/cards');

router.get('/', auth, getAllCards);
router.post('/', auth, createCard);
router.delete('/:cardId', auth, deleteCard);
router.put('/:cardId/likes', auth, likeCard);

module.exports = router;