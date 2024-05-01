const jwt = require('jsonwebtoken');
const user = require('../models/user');

const handleAuthError = (res) => {
  res
    .status(403)
    .send({ message: 'Autorização necessária' });
};

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = async(req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);

  jwt.verify(token, process.env.JWT_SECRET);
 const userDecode = jwt.decode(token)
 res.locals.decode = userDecode;
  const findUser = await user.findById(userDecode._id)
  res.locals.findUser = findUser;

  next();
};