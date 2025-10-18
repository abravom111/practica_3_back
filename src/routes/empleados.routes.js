const { Router }= require('express');
const router=Router();
const
empleado=require('../controllers/empleados.controller.js');
router.get('/',empleado.getEmpleados);
router.post('/', empleado.createEmpleado);
router.put('/:id',empleado.editEmpleado);
router.delete('/:id', empleado.deleteEmpleado);


module.exports=router;
