const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'your_secret_key_here';
// ... existing imports ...

// ---------------- Staff Signup ----------------
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'All fields required' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
      [username, hashedPassword, 'staff']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') { // Unique violation
      return res.status(400).json({ error: 'This email/username is already registered' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ---------------- Login ----------------
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const userResult = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    if (userResult.rows.length === 0) return res.status(400).json({ error: 'User not found' });

    const user = userResult.rows[0];
    // console.log(user.password)
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) return res.status(400).json({ error: 'Incorrect password' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ 
      token, 
      role: user.role,
      username: user.username 
    });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
