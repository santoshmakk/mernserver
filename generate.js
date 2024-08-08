const jwt = require('jsonwebtoken');
require('dotenv').config();

const userId = '66b34acb62a8c93011c42860';
const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

console.log(token);