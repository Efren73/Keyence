const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Employee = require('./employees')

const app = express()
app.use(cors())
app.use(bodyParser.json())


//Buscar todos los empleados
app.get('/all-employees', async (req, res, next) => {
    try {
        const employees = await Employee.findAll()
        console.log('All employees:', employees.map(employee => employee.toJSON()));
        res.send(employees.map(employee => employee.toJSON()))
    } catch (error) {
        console.log('Error fetching employees:', error);
        next()
    }
});

//Buscar un solo empleado
app.get('/employee/:id', async (req, res, next) => {
    const {id} = req.params
    try {
        const employee = await Employee.findOne({
            where: {id: id}
        })
        if (employee) {
            console.log('Employee found:', employee.toJSON());
            res.send(employee)
        } 
        else {
            console.log('Employee not found.');
        }
    } catch (error) {
        console.log('Error fetching employees:', error);
        next()
    }
});

//Agregar un solo empleado
app.post('/create-employee', async(req, res, next) => {
    const body = req.body
    try {
        const newEmployee = Employee.create(body)
        res.send(newEmployee)
        
    } catch (error) {
        next()
    }
})

//Agregar multiples empleados
app.post('/bulk-create', async(req, res, next) => {
    const body = req.body;
    try {
        const employees = await Employee.bulkCreate(body)
        res.send("Creado con éxito")
    } catch (error) {
        next(error)
    }
})

//Actualizar un empleado
app.put('/update-employee/:id', async(req, res, next) => {
    const body = req.body 
    const {id} = req.params
    try {
        const employee = await Employee.update(body, {
            where: {
                id: id
            },
        }) 
        res.send("Peticion realizada con exito")
    } catch (error) {
        next()
    }
})

//Eliminar un empleado
app.delete('/delete-employee/:id', async(req, res, next) => {
    const {id} = req.params;
    try {
        const employee = await Employee.destroy({
            where: {
                id: id
            }
        })
        res.send("Deleted successfully")
    } catch (error) {
        next()
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        "name": err.name,
        "message": `${err.message}, ${err.original ? err.original : ''}`
    })
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});