const express = require('express');

const ligaControler=require('../controllers/ligaController')
//middlewares

const md_autenticacion = require('../middlewares/autenticacion');
const md_rol = require('../middlewares/roles');

const api = express.Router();
api.post('/agregarLiga', [md_autenticacion.Auth] ,ligaControler.AgregarLiga)
api.put('/editarLiga/:idUsuario',[md_autenticacion.Auth],ligaControler.editarLiga)
api.delete('/eliminarLiga/:idUsuario', [md_autenticacion.Auth], ligaControler.eliminarLiga)
api.get('/obtenerLigas/:idUsuario', [md_autenticacion.Auth], ligaControler.obtenerLiga);
module.exports = api;