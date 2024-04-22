require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const authMiddleware  = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

app.use(express.json());

app.use('/users', usersRouter);
app.use('/cards', authMiddleware, cardsRouter);


app.post('/signin', login);
app.post('/signup', createUser);


app.get('/', (req, res) => {
  res.send('Bem-vindo à API do Projeto Around da TripleTen');
});

app.use((req, res) => {
  res.status(404).json({ message: 'A solicitação não foi encontrada' });
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Ocorreu um erro interno no servidor' });
});


app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});