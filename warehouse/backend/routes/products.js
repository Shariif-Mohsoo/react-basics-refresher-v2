const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all products
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, c.category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      ORDER BY p.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT p.*, c.category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id=c.id
      WHERE p.id=$1
    `, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Search products
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const result = await pool.query(`
      SELECT p.*, c.category_name 
      FROM products p
      LEFT JOIN categories c ON p.category_id=c.id
      WHERE LOWER(p.product_name) LIKE LOWER($1) OR LOWER(p.sku) LIKE LOWER($1)
      ORDER BY p.id
    `, [`%${query}%`]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create product
router.post('/', async (req, res) => {
  try {
    const { product_name, sku, category_id, quantity, price } = req.body;
    if (!product_name || !sku || !category_id || quantity===undefined || !price)
      return res.status(400).json({ error: 'All fields are required' });
    const result = await pool.query(
      'INSERT INTO products (product_name, sku, category_id, quantity, price) VALUES($1,$2,$3,$4,$5) RETURNING *',
      [product_name, sku, category_id, quantity, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, sku, category_id, quantity, price } = req.body;
    if (!product_name || !sku || !category_id || quantity===undefined || !price)
      return res.status(400).json({ error: 'All fields are required' });
    const result = await pool.query(
      'UPDATE products SET product_name=$1, sku=$2, category_id=$3, quantity=$4, price=$5 WHERE id=$6 RETURNING *',
      [product_name, sku, category_id, quantity, price, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted', product: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
