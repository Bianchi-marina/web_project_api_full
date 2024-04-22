const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUserById(req, res) {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createUser(req, res) {
  const { name = "Jacques Cousteau", about = "Explorer", avatar = "link", email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "É necessário fornecer email e senha." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Este email já está em uso." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, about, avatar, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateUserProfile(req, res) {
  const userId = req.user._id;
  const { name, about } = req.body;
  try {

    if (userId !== req.params.userId) {
      return res.status(403).json({ message: 'Permissão negada. Você não pode editar este perfil.' });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { name, about }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(updatedUser);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateUserAvatar(req, res) {
  const userId = req.user._id;
  const { avatar } = req.body;
  try {

    if (userId !== req.params.userId) {
      return res.status(403).json({ message: 'Permissão negada. Você não pode editar este avatar.' });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, { avatar }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(updatedUser);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUserInfo(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  getUserInfo,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login
};