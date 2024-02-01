const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Reemplaza con el dominio de tu aplicación frontend
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const sequelize = new Sequelize('bdgalatea', 'root', '0000', {
    host: 'localhost',
    dialect: 'mysql',
});

const Usuario = sequelize.define('Usuario', {
    // Definir la estructura del modelo de Usuario
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const testDatabaseConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
};

testDatabaseConnection();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

// Definir otras rutas y configuraciones del servidor aquí
