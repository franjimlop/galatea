const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const sequelize = require('./models/sequelize');

const app = new Koa();
const router = new Router();

// Configurar CORS y bodyparser
app.use(cors());
app.use(bodyParser());

// Definir rutas
router.get('/', async (ctx) => {
  ctx.body = '¡Hola desde el servidor Koa!';
});

// Usar rutas
app.use(router.routes());
app.use(router.allowedMethods());

// Conectar a la base de datos y arrancar el servidor
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
    app.listen(3001, () => {
      console.log('Servidor Koa escuchando en http://localhost:3001');
    });
  })
  .catch((err) => {
    console.error('Error al conectar con la base de datos:', err);
  });
