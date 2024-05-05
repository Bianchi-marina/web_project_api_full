const Card = require('../models/card');

async function getAllCards(req, res) {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createCard(req, res) {
  const { name, link } = req.body;
  try {
    const newCard = new Card({ name, link, owner: res.locals.decode });
    const savedCard = await newCard.save();
     return res.status(201).json(savedCard);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Dados inválidos passados para criar um cartão' });
    }
    res.status(500).json({ message: error.message });
  }
}

async function deleteCard(req, res) {
  const {_id} = res.locals.decode;
  const {cardId} = req.params;
  const card = await Card.findOne({owner: _id, _id: cardId});
  if (!card) {
    return res.status(404).json({message: 'não existe'});
  }
  if (!card.owner === _id) {
    return res.status(403).json({message: 'não é autorizado'});
  }
  await card.deleteOne({_id: cardId});
  res.status(200).json({message: 'deletado'});
}

async function likeCard(req, res) {
  const {_id} = res.locals.decode;
  const {cardId} = req.params;
  try {
    const card = await Card.findById(cardId);
    if(!card) {
      return res.status(404).json({message: 'Card não encontrado.'});
    }
    if(card.likes.includes(_id)) {
      const dislikeCard = await Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: _id } },
        { new: true }
      );
      return res.status(200).json(dislikeCard);
    } else {
      const likeCard = await Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: _id } },
        { new: true }
      );
      return res.status(200).json(likeCard);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
};