const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

async function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    await promisify(jwt.verify)(token, jwtSecret);
    next();
  } catch (e) {
    if (e.name === 'JsonWebTokenError') {
      res.status(401).json({ status: 'fail', message: 'Invalid token' });
    }

    if (e.name === 'TokenExpiredError') {
      res.status(401).json({ status: 'fail', message: 'Token has expired' });
    }
  }
}

module.exports = ensureAuthenticated;
