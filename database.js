const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/usuarios_db';


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