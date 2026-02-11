const express = require('express');
const cors = require('cors');

const app = express();


// Routes
const productsRouter = require('./routes/products');

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ShopSmart Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Root Route (optional, just to show something)
app.get('/', (req, res) => {
  res.send('ShopSmart Backend Service');
});

module.exports = app;
