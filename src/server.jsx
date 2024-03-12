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
app.post('/consejo', upload.none(), (req, res) => {
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

// Endpoint para borrar un miembro del consejo
app.delete('/consejo/:id', (req, res) => {
  const consejoId = req.params.id;

  connection.query('DELETE FROM consejo WHERE id = ?', [consejoId], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al borrar miembro' });
    } else {
      res.json({ mensaje: 'Miembro borrado exitosamente' });
    }
  });
});

// Endpoint para obtener la lista de documentos
app.get('/documentos', (req, res) => {
  connection.query('SELECT * FROM documento', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al obtener la lista de documentos' });
    } else {
      const documentosConBase64 = results.map((documento) => ({
        id: documento.id,
        nombre: documento.nombre,
        archivo: Buffer.from(documento.archivo).toString('base64'), // Convertir el archivo a base64
      }));
      res.json(documentosConBase64);
    }
  });
});

// Endpoint para crear un nuevo documento
app.post('/documentos', upload.single('archivo'), (req, res) => {
  const { nombre } = req.body;
  const archivoBuffer = req.file.buffer;

  try {
    // Realizar la lógica para insertar en la base de datos
    connection.query('INSERT INTO documento (nombre, archivo) VALUES (?, ?)', [nombre, archivoBuffer], (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: 'Error al crear documento' });
      } else {
        res.json({ mensaje: 'Documento creado exitosamente' });
      }
    });
  } catch (error) {
    console.error('Error al ejecutar la lógica de creación de documento:', error);
    res.status(500).json({ error: 'Error interno del servidor al crear el documento' });
  }
});

// Endpoint para borrar un documento
app.delete('/documentos/:id', (req, res) => {
  const documentoId = req.params.id;

  connection.query('DELETE FROM documento WHERE id = ?', [documentoId], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al borrar documento' });
    } else {
      res.json({ mensaje: 'Documento borrado exitosamente' });
    }
  });
});

// Endpoint para obtener la lista de becas
app.get('/becas', (req, res) => {
  connection.query('SELECT * FROM beca', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al obtener la lista de becas' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint para crear un nuevo miembro del Consejo
app.post('/becas', upload.none(), (req, res) => {
  const { nombre, enlace } = req.body;

  try {
    connection.query('INSERT INTO beca (nombre, enlace) VALUES (?, ?)', [nombre, enlace], (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: 'Error al crear beca' });
      } else {
        const nuevaBeca = { id: results.insertId, nombre, enlace };
        res.json({ mensaje: 'Beca creada exitosamente', nuevaBeca });
      }
    });
  } catch (error) {
    console.error('Error al ejecutar la lógica de creación de beca:', error);
    res.status(500).json({ error: 'Error interno del servidor al crear beca' });
  }
});

// Endpoint para borrar un miembro del consejo
app.delete('/becas/:id', (req, res) => {
  const becaId = req.params.id;

  connection.query('DELETE FROM beca WHERE id = ?', [becaId], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al borrar beca' });
    } else {
      res.json({ mensaje: 'Beca borrada exitosamente' });
    }
  });
});

// Endpoint para obtener la lista de licencias
app.get('/licencias', (req, res) => {
  connection.query('SELECT * FROM licencia', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al obtener la información' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint para crear un nuevo parrafo
app.post('/licencias', upload.none(), (req, res) => {
  const { texto } = req.body;

  try {
    connection.query('INSERT INTO licencia (texto) VALUES (?)', [texto], (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: 'Error al crear licencia' });
      } else {
        const nuevaLicencia = { id: results.insertId, texto };
        res.json({ mensaje: 'Licencia creada exitosamente', nuevaLicencia });
      }
    });
  } catch (error) {
    console.error('Error al ejecutar la lógica de creación de licencia:', error);
    res.status(500).json({ error: 'Error interno del servidor al crear licencia' });
  }
});

// Endpoint para borrar parrafo
app.delete('/licencias/:id', (req, res) => {
  const licenciaId = req.params.id;

  connection.query('DELETE FROM licencia WHERE id = ?', [licenciaId], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al borrar licencia' });
    } else {
      res.json({ mensaje: 'Licencia borrada exitosamente' });
    }
  });
});

// Endpoint para obtener la lista de matriculas
app.get('/matriculas', (req, res) => {
  connection.query('SELECT * FROM matricula', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al obtener la información' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint para crear una nueva matricula
app.post('/matriculas', upload.none(), (req, res) => {
  const { texto } = req.body;

  try {
    connection.query('INSERT INTO matricula (texto) VALUES (?)', [texto], (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: 'Error al crear matricula' });
      } else {
        const nuevaMatricula = { id: results.insertId, texto };
        res.json({ mensaje: 'matrícula creada exitosamente', nuevaMatricula });
      }
    });
  } catch (error) {
    console.error('Error al ejecutar la lógica de creación de matricula:', error);
    res.status(500).json({ error: 'Error interno del servidor al crear matricula' });
  }
});

// Endpoint para borrar parrafo
app.delete('/matriculas/:id', (req, res) => {
  const matriculaId = req.params.id;

  connection.query('DELETE FROM matricula WHERE id = ?', [matriculaId], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al borrar matricula' });
    } else {
      res.json({ mensaje: 'Matricula borrada exitosamente' });
    }
  });
});

// Endpoint para obtener la lista de proyectos
app.get('/proyectos', (req, res) => {
  connection.query('SELECT * FROM proyecto', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al obtener los proyectos' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint para crear un nuevo proyecto
app.post('/proyectos', upload.none(), (req, res) => {
  const { titulo, texto } = req.body;

  try {
    connection.query('INSERT INTO proyecto (titulo, texto) VALUES (?, ?)', [titulo, texto], (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: 'Error al crear proyecto' });
      } else {
        const nuevoProyecto = { id: results.insertId, texto };
        res.json({ mensaje: 'proyecto creado exitosamente', nuevoProyecto });
      }
    });
  } catch (error) {
    console.error('Error al ejecutar la lógica de creación de proyecto:', error);
    res.status(500).json({ error: 'Error interno del servidor al crear proyecto' });
  }
});

// Endpoint para borrar proyecto
app.delete('/proyectos/:id', (req, res) => {
  const proyectoId = req.params.id;

  connection.query('DELETE FROM proyecto WHERE id = ?', [proyectoId], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al borrar proyecto' });
    } else {
      res.json({ mensaje: 'Proyecto borrado exitosamente' });
    }
  });
});

// Endpoint para obtener los calendarios
app.get('/calendarios', (req, res) => {
  connection.query('SELECT * FROM calendario', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al obtener los calendarios' });
    } else {
      const calendarioConBase64 = results.map((calendario) => ({
        id: calendario.id,
        nombre: calendario.nombre,
        foto: calendario.foto.toString('base64'), // Convertir la imagen a base64
      }));
      res.json(calendarioConBase64);
    }
  });
});

// Endpoint para crear un nuevo calendario
app.post('/calendarios', upload.single('foto'), (req, res) => {
  const { nombre } = req.body;
  const fotoBuffer = req.file.buffer;

  connection.query('INSERT INTO calendario (nombre, foto) VALUES (?, ?)', [nombre, fotoBuffer], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al crear calendario' });
    } else {
      res.json({ mensaje: 'Calendario creado exitosamente' });
    }
  });
});

// Endpoint para borrar un calendario
app.delete('/calendarios/:id', (req, res) => {
  const calendarioId = req.params.id;

  connection.query('DELETE FROM calendario WHERE id = ?', [calendarioId], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al borrar calendario' });
    } else {
      res.json({ mensaje: 'calendario borrado exitosamente' });
    }
  });
});

// Endpoint para obtener los enlaces
app.get('/enlaces', (req, res) => {
  connection.query('SELECT * FROM enlacedepartamento', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al obtener los enlaces' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint para crear enlace de departamento
app.post('/enlaces', upload.none(), (req, res) => {
  const { departamento, nombre, enlace } = req.body;

  try {
    connection.query('INSERT INTO enlacedepartamento (departamento, nombre, enlace) VALUES (?, ?, ?)', [departamento, nombre, enlace], (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: 'Error al crear enlace' });
      } else {
        res.json({ mensaje: 'Enlace creado exitosamente' });
      }
    });
  } catch (error) {
    console.error('Error al ejecutar la lógica de enlace:', error);
    res.status(500).json({ error: 'Error interno del servidor al crear proyecto' });
  }
});

// Endpoint para borrar un enlace
app.delete('/enlaces/:id', (req, res) => {
  const enlaceId = req.params.id;

  connection.query('DELETE FROM enlacedepartamento WHERE id = ?', [enlaceId], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al borrar enlace' });
    } else {
      res.json({ mensaje: 'Enlace borrado exitosamente' });
    }
  });
});

// Endpoint para obtener las noticias
app.get('/noticias', (req, res) => {
  connection.query('SELECT * FROM noticia', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al obtener las noticias' });
    } else {
      const noticiaConBase64 = results.map((noticia) => ({
        id: noticia.id,
        nombre: noticia.nombre,
        texto: noticia.texto,
        categoria: noticia.categoria,
        foto: noticia.foto.toString('base64'), // Convertir la imagen a base64
        fecha: noticia.fecha,
      }));
      res.json(noticiaConBase64);
    }
  });
});

// Endpoint para crear una nueva noticia
app.post('/noticias', upload.single('foto'), (req, res) => {
  const { nombre, texto, categoria, fecha } = req.body;
  const foto = req.file.buffer;

  connection.query('INSERT INTO noticia (nombre, texto, categoria, foto, fecha) VALUES (?, ?, ?, ?, ?)', [nombre, texto, categoria, foto, fecha], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al crear noticia' });
    } else {
      res.json({ mensaje: 'Noticia creada exitosamente' });
    }
  });
});

// Endpoint para borrar una noticia y sus archivos adjuntos relacionados
app.delete('/noticias/:id', (req, res) => {
  const noticiaId = req.params.id;

  // Eliminar los archivos adjuntos relacionados con la noticia primero
  connection.query('DELETE FROM adjunto WHERE id_noticia = ?', [noticiaId], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta para borrar adjuntos:', error);
      res.status(500).json({ error: 'Error al borrar adjuntos relacionados con la noticia' });
      return;
    }

    // Una vez que se han eliminado los archivos adjuntos, eliminar la noticia
    connection.query('DELETE FROM noticia WHERE id = ?', [noticiaId], (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta para borrar noticia:', error);
        res.status(500).json({ error: 'Error al borrar noticia' });
        return;
      }

      res.json({ mensaje: 'Noticia y sus archivos adjuntos borrados exitosamente' });
    });
  });
});

// Endpoint para obtener los archivos adjuntos
app.get('/adjuntos', (req, res) => {
  connection.query('SELECT * FROM adjunto', (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al obtener los archivos adjuntos' });
    } else {
      const adjuntoConBase64 = results.map((adjunto) => ({
        id: adjunto.id,
        id_noticia: adjunto.id_noticia,
        archvio: adjunto.archivo.toString('base64'),
      }));
      res.json(adjuntoConBase64);
    }
  });
});

// Endpoint para crear nuevos archivos adjuntos
app.post('/adjuntos', upload.array('archivos'), (req, res) => {
  const { id_noticia } = req.body;
  const archivos = req.files.map(file => file.buffer); // Obtener el buffer de cada archivo adjunto

  const insertQuery = 'INSERT INTO adjunto (id_noticia, archivo) VALUES ?';
  const values = archivos.map(archivo => [id_noticia, archivo]);

  connection.query(insertQuery, [values], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al crear archivos adjuntos' });
    } else {
      res.json({ mensaje: 'Archivos adjuntos creados exitosamente' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});