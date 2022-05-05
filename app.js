const express = require('express');
const cors = require('cors');
const app = express();

// IMPORTACION RUTAS
const adminRoutes = require('./src/routes/adminRoutes');


// MIDDLEWARES
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// CABECERAS
 app.use(cors());
 app.use('/api', adminRoutes);

module.exports = app;