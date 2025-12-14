const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single category
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM categories WHERE id=$1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Category not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create category
router.post('/', async (req, res) => {
  try {
    const { category_name } = req.body;
    if (!category_name) return res.status(400).json({ error: 'Category name is required' });
    const result = await pool.query(
      'INSERT INTO categories (category_name) VALUES($1) RETURNING *',
      [category_name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update category
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name } = req.body;
    if (!category_name) return res.status(400).json({ error: 'Category name is required' });
    const result = await pool.query(
      'UPDATE categories SET category_name=$1 WHERE id=$2 RETURNING *',
      [category_name, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Category not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete category
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM categories WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted', category: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
