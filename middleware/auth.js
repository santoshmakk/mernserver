// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  // console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded should include user ID
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
