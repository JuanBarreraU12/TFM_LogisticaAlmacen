const router = require('express').Router();

const { register, getByIdUwarehouse, getAll } = require('../../models/users_warehouses.model');


router.get('/', (req, res) => {
  getAll()
    .then(async (users_warehouses) => {
      res.json(users_warehouses);
    })
    .catch((error) => {
      res.json({ fatal: error.message });
    })
})

router.post('/', async (req, res) => {
  try {
    const result = await register(req.body);
    const uwarehouse = await getByIdUwarehouse(result.insertId)
      res.json(uwarehouse);
  } catch (error) {
      res.json({ fatal: error.message });
  }
});



module.exports = router;