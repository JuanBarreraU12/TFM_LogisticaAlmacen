const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { register, getByEmail, getById } = require('../../models/usuario.model');
const { getRolById } = require('../../models/rol.model');
const { getEmployeeById } = require('../../models/employee.model');

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
    const iguales = bcrypt.compareSync(password, user.password);
      if (!iguales) {
        return res.json({ fatal: 'Error en email y/o contraseña'})
    }

    if(user)
    {
      const rol= await getRolById(user.rol_id);
      const employee=await getEmployeeById(user.employee_id);
      const response={
        "userName" : user.user_name,
        "email": user.email,
        "rol":rol,
        "employee":employee
      }
      res.json(response);
    }
    else {
        return res.json({ fatal: 'Error en email y/o contraseña'})
    }
})


module.exports = router;