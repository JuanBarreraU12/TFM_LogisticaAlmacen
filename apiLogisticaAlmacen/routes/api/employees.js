const router = require('express').Router();
const { checkSchema } = require('express-validator');
const { nuevoEmployee, checkError } = require('../../helpers/validators');
const { getAll, getById, create, update, deleteById } = require('../../models/employee.model');



router.get('/', (req, res) => {
    getAll()
        .then(employee => {
            res.json(employee);
        })
        .catch((error) => {
            res.json({ fatal: error.message });
        });
});

router.get('/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    const employee = await getById(employeeId);
    if (employee) {
        res.json(employee)
    } else {
        res.json({ error: 'No existe un empleado con ese ID' })
    }
});

router.post('/',
    checkSchema(nuevoEmployee),
    checkError
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