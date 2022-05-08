const Liga = require('../models/ligaModel');
const Usuario = require('../models/userModel');

function AgregarLiga(req, res){
    const parametros = req.body;
    const ligasModel = new Liga();

    if(parametros.nombre){
        ligasModel.nombre = parametros.nombre;
        ligasModel.idUsuario = req.user.sub;

        Liga.find({nombre: {$regex: parametros.nombre, $options:"i"}}, (err, ligaEncontrada) => {
            if(ligaEncontrada.length == 0){
                ligasModel.save((err, ligaGuardada) => {
                    if(err) return res.status(403).send({mensaje: "Error en la peticion de la liga "})
                    if(!ligaGuardada) return res.status(403).send({mensaje:"Error al crear liga"})
                    return res.status(200).send({Liga: ligaGuardada})
                })
            } else{
                return res.status(500).send({mensaje: "Este nombre ya esta siendo utilizado"})
            }
        })
    }else{
        return res.status(500).send({mensaje: "Debe enviar los parametros obligatorios"})
    }
}



function editarLiga(req, res) {
    const datos = req.body;
    const ligaId = req.user.sub;

    if(req.user.rol != 'ROL_USER') return res.send({ message: 'no tienes permiso de editar liga' })
        Liga.findById(ligaId, (err, ligaEcontrada)=>{
            if(err) return res.status(500).send({ message: 'error en la peticion' })
            if(!ligaEcontrada) return res.status(404).send({ message: 'error al listar' })
            Liga.findByIdAndUpdate(ligaEcontrada.id, datos, {new: true}, (err, ligaActualizada)=>{
                if(err) return res.status(500).send({ message: 'error al actualizar' })
                return res.status(200).send({ ligaActualizada: ligaActualizada })
            })
        })
   
}


function eliminarLiga(req,res) {

    var idUsuario = req.params.idUsuario;

  

    if (req.user.rol !== 'ROL_ADMIN') return res.status(500)
        .send({ mensaje: 'Solo el admin puede eliminar' });
  
  
    Liga.findByIdAndDelete(req.params.idUsuario, (err, usuarioEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioEliminado) return res.status(500)
            .send({ mensaje: 'Error al eliminar el usuario' })
  
        return res.status(200).send({ usuario: usuarioEliminado });
    })
   
   
 
}

function obtenerLiga(req,res){

    Liga.find({}, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'Error al buscar liga' })
  
        return res.status(200).send({ usuario: usuarioEncontrado })
    })
}


module.exports ={
    AgregarLiga,
    editarLiga,
    eliminarLiga,
    obtenerLiga
}