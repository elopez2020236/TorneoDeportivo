const express = require('express')
const adminController = require('../controllers/adminController')

const md_autenticacion  = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles')

const api = express.Router()

api.post('/registrarAdmin', [md_autenticacion.Auth] ,adminController.registrarUserAdmin);
api.post('/login', adminController.login);
api.post('/registrarUser', [md_autenticacion.Auth],adminController.registrarUser);
api.delete('/eliminarUser/:idUsuario', [md_autenticacion.Auth],adminController.EliminarUsuario);
api.put('/editarUser/:idUsuario', [md_autenticacion.Auth], adminController.EditarUsuario);
api.get('/verUsuarios/:idUsuario', [md_autenticacion.Auth], adminController.verUsuarios);



module.exports = api