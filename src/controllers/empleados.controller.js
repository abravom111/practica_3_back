const empleadoCtrl={};
const Empleado = require('../models/Empleado');

empleadoCtrl.getEmpleados= async(req, res)=>
{
 const empleados= await Empleado.find();
 res.json(empleados);

 
}


empleadoCtrl.createEmpleado = async (req, res) => {
    
    const { nombre, cargo, departamento, sueldo } = req.body;
    
    const nuevoEmpleado = new Empleado({
        nombre,
        cargo,
        departamento,
        sueldo
    });

    try {
        await nuevoEmpleado.save();
        res.status(201).json({
            status: 'Empleado guardado con éxito',
            empleado: nuevoEmpleado
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el empleado', details: error.message });
    }
}


empleadoCtrl.editEmpleado = async (req, res) => {
    const { nombre, cargo, departamento, sueldo } = req.body;
    
    try {
        const empleadoActualizado = await Empleado.findByIdAndUpdate(
            req.params.id, 
            { nombre, cargo, departamento, sueldo }, 
            { new: true, runValidators: true }
        );

        if (!empleadoActualizado) {
            return res.status(404).json({ status: 'Empleado no encontrado para actualizar' });
        }

        res.json({
            status: 'Empleado actualizado con éxito',
            empleado: empleadoActualizado
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el empleado', details: error.message });
    }
}


empleadoCtrl.deleteEmpleado = async (req, res) => {

    try {
        const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
        
        if (!empleadoEliminado) {
            return res.status(404).json({ status: 'Empleado no encontrado para eliminar' });
        }

        res.json({
            status: 'Empleado eliminado con éxito',
            empleado: empleadoEliminado
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el empleado', details: error.message });
    }
}




module.exports=empleadoCtrl;
