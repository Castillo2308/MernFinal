
const Camiseta = require('../modelos/camisetaEsquema');
const Usuario = require('../modelos/usuarioEsquema'); // Importamos el modelo de Usuario 
exports.obtenerCamisetas = async (req, res) => {
    try {
      // Supongamos que ya tenemos una lista de camisetas obtenida de la base de datos:
const camisetas = await Camiseta.find();  // Lista de camisetas desde la coleccion (ejemplo)

// Enriquecer cada camiseta con datos del usuario creador:
const camisetasConUsuario = await Promise.all(
  camisetas.map(async (c) => {
    try {
      // Buscar al usuario por ID (c.creador) y seleccionar solo nombre y correo
      const usuario = await Usuario.findById(c.creador).select('nombre correo');
      return {
        ...c.toObject(),        // Convertir el documento de Mongoose a objeto plano JS
        creador: usuario || null // Reemplazar el campo 'creador' con los datos del usuario (o null si no se encontró)
      };
    } catch (error) {
      // En caso de error al buscar usuario, devolvemos la camiseta con 'creador' null
      return {
        ...c.toObject(),
        creador: null
      };
    }
  })
);

      res.json(camisetasConUsuario);                       // Responde con la lista en formato JSON
    } catch (error) {
      res.status(500).json({ error: 'Error del servidor' }); // Error genérico en caso de fallo
    }
  };
  
  // Obtener un usuario por ID
  exports.obtenercamisetaxid = async (req, res) => {
    try {
      const camiseta = await Camiseta.findById(req.params.id); // Busca usuario por el ID proporcionado
      if (!camiseta) {
        return res.status(404).json({ error: 'Camiseta no encontrada' }); // Si no existe, 404
      }
      res.json(camiseta); // Si existe, lo devolvemos en JSON
    } catch (error) {
      res.status(500).json({ error: 'Error del servidor' });
    }
  };
  
  // Crear un nuevo usuario
  exports.crearCamiseta = async (req, res) => {
    try {

    const nuevoCamiseta = new Camiseta(req.body);
    nuevoCamiseta.creador = req.usuarioId; // Asignar el ID del usuario que creó la camiseta
    console.log(req.usuarioId); // Verificar que el ID del usuario se está asignando correctamente
      const camisetaGuardada = await nuevoCamiseta.save();      // Guardamos en la base de datos
      res.status(201).json(camisetaGuardada);    // Devolvemos el usuario creado con código 201 (Creado)
    } catch (error) {
        console. log(error);
      res.status(500).json({ error: 'Error al crear camiste' }); // Posibles errores de validación
    }
  };
exports.votarCamiseta = async (req, res) => {
  const id = req.params.id;
  const { calificacion } = req.body;  // calificacion será 1 o -1 según voto
  try {
    // Buscar la camiseta por ID en la base de datos
    const camiseta = await Camiseta.findById(id);
    if (!camiseta) {
      return res.status(404).json({ error: 'Camiseta no encontrada' });
    }
    // Actualizar solo el campo calificacion sumando el valor recibido
    camiseta.calificacion += calificacion;
    await camiseta.save();  // guardar cambios en la BD
    // Devolver la camiseta actualizada (opcionalmente podría devolver solo status)
    return res.json(camiseta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error de servidor' });
  }
};

  // Actualizar un usuario existente
  exports.modificarCamiseta = async (req, res) => {
    try {
      const datosActualizados = req.body;
      const camisetaActualizada = await Camiseta.findByIdAndUpdate(
        req.params.id,
        datosActualizados,
        { new: true } // opción new:true para obtener el documento actualizado
      );
      if (!camisetaActualizada) {
        return res.status(404).json({ error: 'camiseta no encontrada' });
      }
      res.json(camisetaActualizada);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar camiseta' });
    }
  };
  
  // Eliminar un usuario
  exports.eliminarCamiseta = async (req, res) => {
    try {
      const camisetaEliminada = await Camiseta.findByIdAndDelete(req.params.id);
      if (!camisetaEliminada) {
        return res.status(404).json({ error: 'camiseta no encontrada' });
      }
      res.json({ message: 'Camiseta eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error del servidor' });
    }
  };


  