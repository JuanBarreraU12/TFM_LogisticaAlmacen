const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { register } = require('../../models/user.model');

router.post('/register', async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const result = await register(req.body);
    res.json(result);
})



module.exports = router;