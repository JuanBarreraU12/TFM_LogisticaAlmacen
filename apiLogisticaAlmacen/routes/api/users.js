const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { register, getByEmail } = require('../../models/user.model');
const { getRolById } = require('../../models/role.model');
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
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    const { email, password } = req.body;
    const user = await getByEmail(email);
    const iguales = bcrypt.compareSync(password, user.password);
      if (!iguales) {
        return res.json({ fatal: 'Error en email y/o contraseña2'})
    }

    if(user)
    {
      const rol= await getRolById(user.roles_id);
      const employee=await getEmployeeById(user.employees_id);
      const response={
        "userName" : user.username,
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