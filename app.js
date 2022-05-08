const express = require('express');
const cors = require('cors');
const app = express();

// IMPORTACION RUTAS
const adminRoutes = require('./src/routes/adminRoutes');
const ligaRoutes = require('./src/routes/ligaRoutes');


// MIDDLEWARES
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// CABECERAS
 app.use(cors());
 app.use('/api', adminRoutes, ligaRoutes);

module.exports = app;