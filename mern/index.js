require('dotenv').config();
const mongoURI = process.env.DB_HOST; // Cargar la URI de conexión desde las variables de entorno
const mongoose = require('mongoose'); // importamos la librería Mongoose
const path = require('path'); 
const {verificartoken} = require('./seguridad/auth')// Importamos path para manejar rutas de archivos


// URI de conexión a MongoDB (MongoDB Atlas en este caso). 
// Reemplaza <usuario>, <password> y <tuBase> por tus datos reales.


// Opciones recomendadas para evitar advertencias (según la versión de Mongoose)
const options = {
  useNewUrlParser: true,    // Usa el nuevo parser de URL Mongo
  useUnifiedTopology: true  // Usa el nuevo motor de manejo de topologías
};

// Conectarse a la base de datos:
mongoose.connect(mongoURI, options)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))   // Éxito en la conexión
  .catch(err => console.error('❌ Error de conexión:', err)); // Manejo de error
  const express = require('express');
  const routes = require('./rutas/rutasUsuario'); // Importamos las rutas de usuario
  const routesCamiseta = require('./rutas/rutasCamiseta'); 
  const app = express();
  app.use(express.json());
  app.use('/api/usuarios', routes) // Middleware para parsear JSON en las peticiones (body-parser integrado)
  app.use('/api/camisetas', routesCamiseta)
 
  app.use(express.json()); // Middleware para parsear JSON en las peticiones (body-parser integrado)
  //app.use(express.static(path.join(__dirname, 'public')));

  app.get('/camiseta', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'camiseta.html'));
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/carrusel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'carrusel.html'));
});


  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor API escuchando en http://localhost:${PORT}`);     
  }); // Servir archivos estáticos desde la carpeta 'public'
  