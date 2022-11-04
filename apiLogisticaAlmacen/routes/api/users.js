const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { register, getByEmail } = require('../../models/usuario.model');

router.post('/register', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        const result = await register(req.body);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await getByEmail(email);

    if (!user) {
        return res.json({ fatal: 'Error en email y/o contraseña'})
    }

    const iguales = bcrypt.compareSync(password, user.password);
     if (!iguales) {
        return res.json({ fatal: 'Error en email y/o contraseña'})
    }
    res.json({success: true});

})



module.exports = router;