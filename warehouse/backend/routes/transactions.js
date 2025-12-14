const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.*, p.product_name
      FROM transactions t
      LEFT JOIN products p ON t.product_id=p.id
      ORDER BY t.transaction_date DESC, t.id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single transaction
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT t.*, p.product_name
      FROM transactions t
      LEFT JOIN products p ON t.product_id=p.id
      WHERE t.id=$1
    `, [id]);
    if (result.rows.length===0) return res.status(404).json({ error: 'Transaction not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create transaction and update product quantity
router.post('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const { product_id, transaction_type, quantity, transaction_date } = req.body;
    if (!product_id || !transaction_type || !quantity || !transaction_date)
      return res.status(400).json({ error: 'All fields required' });
    if (!['IN','OUT'].includes(transaction_type))
      return res.status(400).json({ error: 'Transaction type must be IN or OUT' });

    await client.query('BEGIN');

    const transactionResult = await client.query(
      'INSERT INTO transactions (product_id, transaction_type, quantity, transaction_date) VALUES($1,$2,$3,$4) RETURNING *',
      [product_id, transaction_type, quantity, transaction_date]
    );

    const qtyChange = transaction_type === 'IN' ? quantity : -quantity;
    await client.query('UPDATE products SET quantity=quantity+$1 WHERE id=$2', [qtyChange, product_id]);

    await client.query('COMMIT');
    res.status(201).json(transactionResult.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

module.exports = router;
