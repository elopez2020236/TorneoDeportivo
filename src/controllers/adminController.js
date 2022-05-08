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
  const usuarioModel = new Usuario();

  if (req.user.rol == 'ROL_ADMIN') {

    if (parametro.nombre && parametro.email && parametro.password) {
      usuarioModel.nombre = parametro.nombre;
      usuarioModel.email = parametro.email;
      usuarioModel.password = parametro.password;
      usuarioModel.rol = "ROL_ADMIN";

      Usuario.find({ email: parametro.email }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length == 0) {
          bcrypt.hash(
            parametro.password,
            null,
            null,
            (err, passwordEncriptada) => {
              usuarioModel.password = passwordEncriptada;

              usuarioModel.save((err, usuarioGuardado) => {
                if (err)
                  return res.status(500).send({ mensaje: "Error en la petición" });
                if (!usuarioGuardado)
                  return res.status(500).send({ mensaje: "Error al agregar  admin" });
                return res.status(200).send({ usuarioAdminCreado: usuarioGuardado });
              });
            }
          );
        } else {
          return res.status(500).send({ error: "El correo ya esta en uso" });
        }
      });
    } else {
      return res.status(500).send({ error: "Debe de enviar los parametros obligatorios" });
    }
  } else {
    return res.status(400).send({ mensaje: 'No tiene acceso a registrar' })
  }
}

function login(req, res) {
  var parametros = req.body;
  Usuario.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
    if (usuarioEncontrado) {
      bcrypt.compare(parametros.password, usuarioEncontrado.password,
        (err, verificacionPassword) => {
          if (verificacionPassword) {
            return res.status(200)
              .send({ token: jwt.crearToken(usuarioEncontrado) })
          } else {
            return res.status(500)
              .send({ mensaje: 'La contrasena no coincide.' })
          }
        })
    } else {
      return res.status(500)
        .send({ mensaje: 'El usuario, no se ha podido identificar' })
    }
  })
}

function registrarUser(req, res) {
  const parametro = req.body;
  const usuarioModel = new Usuario();

  if (req.user.rol == 'ROL_ADMIN') {

    if (parametro.nombre && parametro.email && parametro.password) {
      usuarioModel.nombre = parametro.nombre;
      usuarioModel.email = parametro.email;
      usuarioModel.password = parametro.password;
      usuarioModel.rol = "ROL_USER";

      Usuario.find({ email: parametro.email }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length == 0) {
          bcrypt.hash(
            parametro.password,
            null,
            null,
            (err, passwordEncriptada) => {
              usuarioModel.password = passwordEncriptada;

              usuarioModel.save((err, usuarioGuardado) => {
                if (err)
                  return res.status(500).send({ mensaje: "Error en la petición" });
                if (!usuarioGuardado)
                  return res.status(500).send({ mensaje: "Error al agregar" });
                return res.status(200).send({ usuarioCreado: usuarioGuardado });
              });
            }
          );
        } else {
          return res.status(500).send({ error: "El correo ya esta en uso" });
        }
      });
    } else {
      return res.status(500).send({ error: "Debe de enviar los parametros obligatorios" });
    }
  } else {
    return res.status(400).send({ mensaje: 'No tiene acceso a registrar' })
  }
}

function EliminarUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  

  if (req.user.rol !== 'ROL_ADMIN') return res.status(500)
      .send({ mensaje: 'Solo el admin puede eliminar' });


  Usuario.findByIdAndDelete(req.params.idUsuario, (err, usuarioEliminado) => {
      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
      if (!usuarioEliminado) return res.status(500)
          .send({ mensaje: 'Error al eliminar el usuario' })

      return res.status(200).send({ usuario: usuarioEliminado });
  })

}

function EditarUsuario(req, res){
  var userId = req.user.sub
  var params = req.body

  if (req.user.rol !== 'ROL_ADMIN') return res.status(500)
  .send({ mensaje: 'Solo el admin puede eliminar' });

  delete params.rol
  delete params.password


  Usuario.findByIdAndUpdate(userId, params, {new: true}, (err, usuarioActualizado) =>{
      if(err) return res.status(500).send({ message: 'error en la peticion' })
      if(!usuarioActualizado) return res.status(404).send({ message: 'no se ha podido editar el usuario' })
      return res.status(200).send({ user: usuarioActualizado })
  })
}


function verUsuarios(req, res) {
  Usuario.find({}, (err, usuarioEncontrado) => {
      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
      if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'Error al buscar empresa' })

      return res.status(200).send({ usuario: usuarioEncontrado })
  })
}


module.exports = {
  crearAdmin,
  registrarUserAdmin,
  login,
  registrarUser,
  EliminarUsuario,
  EditarUsuario,
  verUsuarios
}