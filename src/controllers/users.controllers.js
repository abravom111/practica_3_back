const empleadoCtrl={};
const Empleado=require('../models/Empleado');

empleadoCtrl.getEmpleados=(req,res)=>{
 res.send('get empleados')
}

empleadoCtrl.createEmpleado=(req,res)=>{
    res.send('create Empleado')
}

empleadoCtrl.editEmpleado=(req,res)=>{}
empleadoCtrl.deleteEmpleado=(req,res)=>{}


module.exports=empleadoCtrl;