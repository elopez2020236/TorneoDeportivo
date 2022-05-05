const express = require('express')
const userController = require('../controllers/userController')

const md_autenticacion  = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles')

const api = express.Router()

api.post('/registrarAdmin', [md_autenticacion.Auth] ,userController.registrarUserAdmin);


module.exports = api