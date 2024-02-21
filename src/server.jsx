const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000; // Puerto para el servidor Node.js

app.use(cors());
app.use(express.json());

const secretKey = 'Galatea2024';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bdgalatea',
  port: 3306, // Puerto por defecto de MySQL
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Ruta para autenticar y generar token JWT
app.post('/login', (req, res) => {
  const { usuario, contrasena } = req.body;

  // Consultar la base de datos para verificar las credenciales
  connection.query('SELECT * FROM usuario WHERE nombre = ? AND password = ?', [usuario, contrasena], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al autenticar el usuario' });
    } else {
      if (results.length > 0) {
        // Usuario autenticado, generar token
        const token = jwt.sign({ usuario }, secretKey, { expiresIn: '14d' });
        res.json({ token });
      } else {
        // Credenciales inválidas
        res.status(401).json({ error: 'Credenciales inválidas' });
      }
    }
  });
});

// Middleware para verificar el token antes de acceder a recursos protegidos
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: 'Acceso no autorizado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token no válido' });
    }

    req.user = decoded.usuario;
    next();
  });
};

// Ruta protegida que requiere un token válido
app.get('/recursos-protegidos', verifyToken, (req, res) => {
  res.json({ message: 'Acceso a recursos protegidos exitoso', user: req.user });
});

// Ruta para obtener la lista de usuarios
app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuario', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    } else {
      res.json(results);
    }
  });
});

// Ruta para crear un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { nombre, password } = req.body;

  connection.query('INSERT INTO usuario (nombre, password) VALUES (?, ?)', [nombre, password], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al crear el usuario' });
    } else {
      res.json({ message: 'Usuario creado exitosamente', userId: results.insertId });
    }
  });
});

// Ruta para borrar un usuario por su ID
app.delete('/usuarios/:id', (req, res) => {
  const userId = req.params.id;

  connection.query('DELETE FROM usuario WHERE id = ?', [userId], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al borrar el usuario' });
    } else {
      res.json({ message: 'Usuario borrado exitosamente' });
    }
  });
});

// Endpoint para obtener la lista de imágenes
app.get('/imagenes', (req, res) => {
  connection.query('SELECT * FROM fotocarrusel', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al obtener la lista de imágenes' });
    } else {
      const imagenesConBase64 = results.map((imagen) => ({
        id: imagen.id,
        nombre: imagen.nombre,
        foto: imagen.foto.toString('base64'), // Convertir la imagen a base64
      }));
      res.json(imagenesConBase64);
    }
  });
});

// Endpoint para subir una nueva imagen
app.post('/imagenes', upload.single('imagen'), (req, res) => {
  const { nombre } = req.body;
  const fotoBuffer = req.file.buffer;

  connection.query('INSERT INTO fotocarrusel (nombre, foto) VALUES (?, ?)', [nombre, fotoBuffer], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al subir la imagen' });
    } else {
      res.json({ message: 'Imagen subida exitosamente', imagenId: results.insertId });
    }
  });
});

// Endpoint para borrar una imagen
app.delete('/imagenes/:id', (req, res) => {
  const imagenId = req.params.id;

  connection.query('DELETE FROM fotocarrusel WHERE id = ?', [imagenId], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al borrar la imagen' });
    } else {
      res.json({ message: 'Imagen borrada exitosamente' });
    }
  });
});

// Endpoint para obtener la lista de miembros del equipo directivo
app.get('/equipodirectivo', (req, res) => {
  connection.query('SELECT * FROM equipodirectivo', (error, results) => {
      if (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).json({ error: 'Error al obtener la lista de miembros del equipo directivo' });
      } else {
          const equipoDirectivoConBase64 = results.map((miembro) => ({
              id: miembro.id,
              nombre: miembro.nombre,
              puesto: miembro.puesto,
              foto: miembro.foto.toString('base64'), // Convertir la imagen a base64
          }));
          res.json(equipoDirectivoConBase64);
      }
  });
});

// Endpoint para crear un nuevo miembro del equipo directivo
app.post('/equipodirectivo', upload.single('imagen'), (req, res) => {
  const { directivo, puesto } = req.body;
  const fotoBuffer = req.file.buffer;

  connection.query('INSERT INTO equipodirectivo (nombre, puesto, foto) VALUES (?, ?, ?)', [directivo, puesto, fotoBuffer], (error, results) => {
      if (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).json({ error: 'Error al crear miembro del equipo directivo' });
      } else {
          res.json({ mensaje: 'Miembro del equipo directivo creado exitosamente' });
      }
  });
});

// Endpoint para borrar un miembro del equipo directivo
app.delete('/equipodirectivo/:id', (req, res) => {
  const miembroId = req.params.id;

  connection.query('DELETE FROM equipodirectivo WHERE id = ?', [miembroId], (error, results) => {
      if (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).json({ error: 'Error al borrar miembro del equipo directivo' });
      } else {
          res.json({ mensaje: 'Miembro del equipo directivo borrado exitosamente' });
      }
  });
});

// Endpoint para obtener la lista de instalaciones
app.get('/instalaciones', (req, res) => {
  connection.query('SELECT * FROM instalacion', (error, results) => {
      if (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).json({ error: 'Error al obtener la lista de instalaciones' });
      } else {
          const instalacionesConBase64 = results.map((instalacion) => ({
              id: instalacion.id,
              nombre: instalacion.nombre,
              foto: instalacion.foto.toString('base64'), // Convertir la imagen a base64
          }));
          res.json(instalacionesConBase64);
      }
  });
});

// Endpoint para crear una nueva instalación
app.post('/instalaciones', upload.single('imagen'), (req, res) => {
  const { nombre } = req.body;
  const fotoBuffer = req.file.buffer;

  try {
      // Realizar la lógica para insertar en la base de datos
      connection.query('INSERT INTO instalacion (nombre, foto) VALUES (?, ?)', [nombre, fotoBuffer], (error, results) => {
          if (error) {
              console.error('Error al ejecutar la consulta:', error);
              res.status(500).json({ error: 'Error al crear instalación' });
          } else {
              res.json({ mensaje: 'Instalación creada exitosamente' });
          }
      });
  } catch (error) {
      console.error('Error al ejecutar la lógica de creación de instalación:', error);
      res.status(500).json({ error: 'Error interno del servidor al crear la instalación' });
  }
});


// Endpoint para borrar una instalación
app.delete('/instalaciones/:id', (req, res) => {
  const instalacionId = req.params.id;

  connection.query('DELETE FROM instalacion WHERE id = ?', [instalacionId], (error, results) => {
      if (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).json({ error: 'Error al borrar instalación' });
      } else {
          res.json({ mensaje: 'Instalación borrada exitosamente' });
      }
  });
});

// Endpoint para obtener la lista de miembros del Consejo
app.get('/consejo', (req, res) => {
  connection.query('SELECT * FROM consejo', (error, results) => {
      if (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).json({ error: 'Error al obtener la lista de miembros del Consejo' });
      } else {
          res.json(results);
      }
  });
});

// Endpoint para crear un nuevo miembro del Consejo
app.post('/consejo', (req, res) => {
  const { nombre, origen } = req.body;

  try {
      connection.query('INSERT INTO consejo (nombre, origen) VALUES (?, ?)', [nombre, origen], (error, results) => {
          if (error) {
              console.error('Error al ejecutar la consulta:', error);
              res.status(500).json({ error: 'Error al crear miembro del Consejo' });
          } else {
              const nuevoMiembro = { id: results.insertId, nombre, origen };
              res.json({ mensaje: 'Miembro del Consejo creado exitosamente', nuevoMiembro });
          }
      });
  } catch (error) {
      console.error('Error al ejecutar la lógica de creación de miembro del Consejo:', error);
      res.status(500).json({ error: 'Error interno del servidor al crear el miembro del Consejo' });
  }
});

// Endpoint para borrar un miembro del Consejo
app.delete('/consejo/:id', (req, res) => {
  const miembroId = req.params.id;

  connection.query('DELETE FROM consejo WHERE id = ?', [miembroId], (error, results) => {
      if (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).json({ error: 'Error al borrar miembro del Consejo' });
      } else {
          res.json({ mensaje: 'Miembro del Consejo borrado exitosamente' });
      }
  });
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});