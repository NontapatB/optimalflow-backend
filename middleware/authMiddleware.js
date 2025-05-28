const jwt = require('jsonwebtoken');
const { readUsers } = require('../utils/fileStorage');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if(!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const users = readUsers();
    const user = users.find(u => u.id === decoded.id);

    console.log('Decoded token:', decoded);
    console.log('All user IDs:', users.map(u => u.id));

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden' });
  }
}

module.exports = { authenticateToken };