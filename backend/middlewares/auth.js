const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res
    .status(403)
    .send({ message: 'Autorização necessária' });
};

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);

  jwt.verify(token, process.env.JWT_SECRET);
  res.locals.decode = jwt.decode(token);

  next();
};