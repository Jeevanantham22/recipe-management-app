const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch {
    return null;
  }
};

const context = ({ req }) => {
  const token = req.headers.authorization || '';
  const user = verifyToken(token.replace('Bearer ', ''));
  return { user };
};

module.exports = context;
