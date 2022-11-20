const router = require('express').Router();
const { checkSchema } = require('express-validator');
const { newEmployee } = require('../../helpers/schemas/employee.schema');
const { badRequest } = require('../../helpers/validators');
const { getAll, getById, create, update, deleteById } = require('../../models/employee.model');
const { getRolById } = require('../../models/role.model');
const { getuserByIdEmployee } = require('../../models/user.model');
const { getwarehouseByIdUser } = require('../../models/users_warehouses.model')


/* router.get('/', (req, res) => {
    getAll()
        .then (employee => {
            

            res.json(employee);
        })
        .catch((error) => {
            res.json({ fatal: error.message });
        });
 }); */

router.get('/', (req, res) => {
    getAll()
        .then(async (employee) => {
            let respuesta = [];
            for (let item of employee) {
                const user = await getuserByIdEmployee(item.id);
                if (user) {
                    const id = user.id;
                    console.log(id);
                    const userwarehause = await getwarehouseByIdUser(user.id);
                    
                    const info = {
                        "id": item.id,
                        "name": item.name,
                        "first_last_name": item.first_last_name,
                        "second_last_name": item.first_last_name, 
                        "email": item.email, 
                        "dni": item.dni, 
                        "cell_phone": item.cell_phone,
                        "birth_date": item.birth_date,
                        "rol": {
                            "id": user.roles_id
                        },
                        "warehouse": {
                            "id": userwarehause.id
                        }
                    }
                    respuesta.push(info);
                }   
            };
            res.json(respuesta);
            
        })
        .catch((error) => {
            res.json({ fatal: error.message });
        });
});




router.get('/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    const employee = await getById(employeeId);
    if (employee) {
        const user = await getuserByIdEmployee(employeeId)
        if (user) {    
            const userwarehause = await getwarehouseByIdUser(user.id)
            const response = {
                "name": employee.name,
                "first_last_name": employee.first_last_name,
                "second_last_name": employee.first_last_name, 
                "email": employee.email, 
                "dni": employee.dni, 
                "cell_phone": employee.cell_phone,
                "birth_date": employee.birth_date,
                "rol": {
                    "id": user.roles_id
                },
                "warehouse": {
                     "id": userwarehause.id
                }
            }
            res.json(response)
            
        }

        
    } else {
        res.json({ error: 'No existe un empleado con ese ID' })
    }

   
});

router.post('/',
    checkSchema(newEmployee),
    badRequest
    , async (req, res) => {
        try {
            const result = await create(req.body);
            const employee = await getById(result.insertId);
            res.json(employee);
        } catch (error) {
            res.json({ fatal: error.message });
        }
});

router.put('/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    const result = await update(employeeId, req.body);
    res.json(result);
});

router.delete('/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    const result = await deleteById(employeeId);
    res.json(result);
});

module.exports = router;