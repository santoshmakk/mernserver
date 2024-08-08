// routes/token.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Token = require('../models/Token');
const jwt = require('jsonwebtoken');

// POST /api/tokens/generate
router.post('/generate', auth, async (req, res) => {
  try {
    const { scopes } = req.body;
    const user = req.user;

    if (!scopes || !Array.isArray(scopes)) {
      return res.status(400).json({ msg: 'Invalid scopes' });
    }

    const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1y' });

    const tokenEntry = new Token({
      token: newToken,
      createdBy: user.id,
      scopes,
    });

    await tokenEntry.save();
    res.status(201).json({ token: newToken });
  } catch (error) {
    console.error('Error in token generation:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/tokens
router.get('/', auth, async (req, res) => {
    try {
      const tokens = await Token.find({ createdBy: req.user.id });
      res.status(200).json(tokens);
    } catch (error) {
      console.error('Error fetching tokens:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
// routes/token.js
router.delete('/:id', auth, async (req, res) => {
    try {
      const token = await Token.findById(req.params.id);
      if (!token) return res.status(404).json({ msg: 'Token not found' });
  
      // Ensure the token belongs to the user making the request
      if (token.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ msg: 'Not authorized' });
      }
  
      await Token.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: 'Token deleted' });
    } catch (error) {
      console.error('Error deleting token:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

module.exports = router;
