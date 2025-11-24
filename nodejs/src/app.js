const express = require('express');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Routes
app.use('/products', productRoutes);

// Error handling middleware
app.use(errorHandler);

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

module.exports = app;