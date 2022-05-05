const express = require('express')
const adminController = require('../controllers/adminController')

const md_autenticacion  = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles')

const api = express.Router()

api.post('/registrarAdmin', [md_autenticacion.Auth] ,adminController.registrarUserAdmin);
api.post('/login', adminController.login);


module.exports = api