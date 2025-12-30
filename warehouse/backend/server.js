const express = require('express');
const cors = require('cors');

const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const transactionsRoutes = require('./routes/transactions');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth/',authRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
