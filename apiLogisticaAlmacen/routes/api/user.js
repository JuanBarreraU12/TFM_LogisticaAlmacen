const { checkSchema } = require('express-validator');
const { nuevoUsuario, checkError } = require('../../helpers/validators');
const { getAll, getById, create, update, deleteById } = require('../../models/user.model');

const router = require('express').Router();


router.get('/', (req, res) => {
    getAll()
        .then(user => {
            res.json(user);
        })
        .catch((error) => {
            res.json({ fatal: error.message });
        });
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const user = await getById(userId);
    if (user) {
        res.json(user)
    } else {
        res.json({ error: 'No existe un usuario con ese ID' })
    }
});

router.post('/',
    checkSchema(nuevoUsuario),
    checkError
    , async (req, res) => {
        try {
            const result = await create(req.body);
            const user = await getById(result.insertId);
            res.json(user);
        } catch (error) {
            res.json({ fatal: error.message });
        }
    });

router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const result = await update(userId, req.body);
    res.json(result);
});

router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;
    const result = await deleteById(userId);
    res.json(result)
});

module.exports = router;