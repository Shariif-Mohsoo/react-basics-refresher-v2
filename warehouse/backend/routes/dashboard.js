const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/stats', async (req,res)=>{
  try{
    const totalProducts = await pool.query('SELECT COUNT(*) FROM products');
    const totalValue = await pool.query('SELECT SUM(quantity*price) as total FROM products');
    const lowStock = await pool.query('SELECT COUNT(*) FROM products WHERE quantity<10');
    const totalCategories = await pool.query('SELECT COUNT(*) FROM categories');

    res.json({
      totalProducts: parseInt(totalProducts.rows[0].count),
      totalValue: parseFloat(totalValue.rows[0].total)||0,
      lowStock: parseInt(lowStock.rows[0].count),
      totalCategories: parseInt(totalCategories.rows[0].count)
    });
  }catch(err){
    res.status(500).json({error:'Server error'});
  }
});

router.get('/recent-transactions', async (req,res)=>{
  try{
    const result = await pool.query(`
      SELECT t.*, p.product_name
      FROM transactions t
      LEFT JOIN products p ON t.product_id=p.id
      ORDER BY t.transaction_date DESC, t.id DESC
      LIMIT 5
    `);
    res.json(result.rows);
  }catch(err){
    res.status(500).json({error:'Server error'});
  }
});

module.exports = router;
