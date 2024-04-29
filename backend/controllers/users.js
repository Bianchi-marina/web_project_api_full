const User = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;

  const userfind = await User.findById({_id:id});
  res.status(200).json(userfind);
}

async function createUser(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().optional().min(2).max(30),
    about: Joi.string().optional().min(2).max(30),
    avatar: Joi.string().optional().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }
  const { name, about, avatar, email, password } = value;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  // const salt = await bcrypt.genSalt();
  // const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // return User.create({ ...req.body, password: hashedPassword })
  //   .then((user) => {
  //     res.json(user);
  //   })
  //   .catch((err) => {
  //     res.status(400).json(err);
  //   });
}

async function updateUserProfile(req, res) {
  const userId = req.user._id;
  const { name, about } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (userId !== req.params.userId) {
      return res.status(403).json({
        message: "Permissão negada. Você não pode editar este perfil.",
      });
    }

    user.name = name;
    user.about = about;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateUserAvatar(req, res) {
  const userId = req.user._id;
  const { avatar } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (userId !== req.params.userId) {
      return res.status(403).json({
        message: "Permissão negada. Você não pode editar este avatar.",
      });
    }

    user.avatar = avatar;
    const updatedUser = await user.save();
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
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar o login' });
  }
}

async function getUserInfo(req, res) {

}

module.exports = {
  getAllUsers,
  getUserById,
  getUserInfo,
  updateUserProfile,
  updateUserAvatar,
  createUser,
  login,
};
