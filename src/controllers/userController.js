const Usuario = require("../models/userModel");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

//-------------------------Funciones Básicas De Admin

function crearAdmin(req, res) {
    var usuarioModel = new Usuario();

    Usuario.find({ rol: 'ROL_ADMIN' }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length > 0) {
            return console.log({ mensaje: "Ya existe el ADMIN" })
        } else {
            usuarioModel.nombre = 'ADMIN';
            usuarioModel.email = 'ADMIN';
            usuarioModel.rol = 'ROL_ADMIN';
            bcrypt.hash('deportes123', null, null, (err, passwordEncriptada) => {
                usuarioModel.password = passwordEncriptada;

                usuarioModel.save((err, usuarioGuardado) => {
                    if (err) console.log({ mensaje: 'Error en la peticion' });
                    if (!usuarioGuardado) return console.log({ mensaje: 'Error al agregar' });

                    return console.log({ usuario: usuarioGuardado });
                });
            });
        }
    })

}

function registrarUserAdmin(req, res) {
    const parametro = req.body;
    const modeloUsuario = new Usuario();
  
    if (parametro.nombre && parametro.email && parametro.password) {
      modeloUsuario.nombre = parametro.nombre;
      modeloUsuario.email = parametro.email;
      modeloUsuario.password = parametro.password;
      modeloUsuario.rol = "ROL_ADMIN";
  
      Usuario.find({ email: parametro.email }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length == 0) {
          bcrypt.hash(
            parametro.password,
            null,
            null,
            (err, passwordEncriptada) => {
              modeloUsuario.password = passwordEncriptada;
  
              modeloUsuario.save((err, usuarioGuardado) => {
                if (err)
                  return res
                    .status(500)
                    .send({ mensaje: "Error en la petición" });
                if (!usuarioGuardado)
                  return res
                    .status(500)
                    .send({ mensaje: "Error al agregar  admin" });
                return res
                  .status(200)
                  .send({ usuarioAdminCreado: usuarioGuardado });
              });
            }
          );
        } else {
          return res.status(500).send({ error: "El correo ya esta en uso" });
        }
      });
    } else {
      return res
        .status(500)
        .send({ error: "Debe de enviar los parametros obligatorios" });
    }
  }
  

module.exports = {
    crearAdmin,
    registrarUserAdmin
}