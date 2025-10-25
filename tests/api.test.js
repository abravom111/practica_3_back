const request = require('supertest');
const app = require('../app'); 

const dbConnectionPromise = require('../database'); 
const Empleado = require('../src/models/Empleado');

let mongooseInstance; 

let employeeId = "68fcf4dea072ccd1cd0c7645";


describe("Pruebas de Integración de Empleados", () => {

    before(async () => {
        try {
            mongooseInstance = await dbConnectionPromise; 
        } catch (error) {
            throw new Error('No se pudo conectar a MongoDB. Asegúrate de que el servidor está corriendo.');
        }
    });


    after(async () => {
        if (mongooseInstance) {
             //await Empleado.deleteMany({});
             await mongooseInstance.connection.close();
             console.log('BD de prueba desconectada y limpia.');
        }
    });

    describe("GET /api/empleados", () => {
        it('debería responder con código 200 y un JSON con la lista de empleados', (done) => {
            request(app)
                .get('/api/empleados') 
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/) 
                .expect(200, done); 
        });
    });

    describe("POST /api/empleados", () => {
         it('debería crear un nuevo empleado y devolver el código 201', (done) => {
            const nuevoEmpleadoData = {
                nombre: 'Angel Bravo Test',
                cargo: 'Ingeniero de Pruebas',
                departamento: 'Desarrollo',
                sueldo: 99999 
            };

            request(app)
                .post('/api/empleados')
                .send(nuevoEmpleadoData)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(201, done);
         });
    });
    
    



    describe("PUT /api/empleados/:id (Modificar)", () => {
        const updatedData = {
            nombre: 'Empleado Modificado',
            cargo: 'Senior',
            departamento: 'Ventas',
            sueldo: 65000 
        };

        it('debería modificar el empleado y devolver el código 200 con datos actualizados', (done) => {
            request(app)
                .put(`/api/empleados/${employeeId}`)
                .send(updatedData)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200) // 200 OK
                .end((err, res) => {
                    if (err) return done(err);
                    
                    if (res.body.empleado.cargo !== updatedData.cargo) {
                        return done(new Error('El cargo no se actualizó.'));
                    }
                    done();
                });
        });

        
        it('debería devolver 404 si el empleado a actualizar no existe', (done) => {
            const fakeId = '60c72b2f9b1e8e2b8c9d1a3b'; 
            request(app)
                .put(`/api/empleados/${fakeId}`)
                .send(updatedData)
                .expect(404, done);
        });
    });



    describe("DELETE /api/empleados/:id", () => {
        it('debería eliminar el empleado y devolver código 200', (done) => {
            request(app)
                .delete(`/api/empleados/${employeeId}`) 
                .expect(200) // 200 OK
                .end(async (err, res) => {
                    if (err) return done(err);
                    
                    const deletedEmployee = await Empleado.findById(employeeId);
                    if (deletedEmployee !== null) {
                        return done(new Error('El empleado no fue eliminado de la base de datos.'));
                    }

                    if (res.body.status !== 'Empleado eliminado con éxito') {
                        return done(new Error('Mensaje de eliminación incorrecto'));
                    }

                    done();
                });
        });

        
        it('debería devolver 404 si el empleado no existe', (done) => {
            const fakeId = '60c72b2f9b1e8e2b8c9d1a3b';
            request(app)
                .delete(`/api/empleados/${fakeId}`)
                .expect(404, done);
        });
    });


});