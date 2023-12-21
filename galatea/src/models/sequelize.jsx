const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'iesgalatea',
  password: 'galatea',
  database: 'galatea',
});

module.exports = sequelize;