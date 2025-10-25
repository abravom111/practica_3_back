const mongoose = require('mongoose');
//const URI = 'mongodb://localhost:27017/usuarios_db';

//mongodb+srv://abravom111_db_user:<db_password>@clouddb.3xisukb.mongodb.net/?appName=cloudDb
const ATLAS_USERNAME = 'abravom111_db_user'; // <-- Reemplaza
const ATLAS_PASSWORD = '2cJ46vYNERqglWGt'; // <-- Reemplaza
const ATLAS_HOST = 'clouddb.3xisukb.mongodb.net'; // <-- Reemplaza (es la URL de tu clúster)
const DB_NAME = 'usuarios_db'; // <-- Reemplaza con el nombre de tu base de datos

const URI = `mongodb+srv://${ATLAS_USERNAME}:${ATLAS_PASSWORD}@${ATLAS_HOST}/${DB_NAME}?retryWrites=true&w=majority`;



const dbConnectionPromise = mongoose.connect(URI)
    .then(() => {
        console.log('BD de prueba conectada para Mocha.');
        return mongoose;
    })
    .catch(err => {
        console.error('Error al conectar a la BD:', err);
        throw err; 
    });


module.exports = dbConnectionPromise;