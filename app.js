const express=require('express');
const morgan=require('morgan');
const cors = require('cors'); 
const app=express();

app.set('puerto',process.env.PORT|| 3000);
app.set('nombreApp','Gestión de empleados');

app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:4200' 
}));

app.use(express.json());



app.use('/api/empleados',require('./src/routes/empleados.routes'));

module.exports=app;