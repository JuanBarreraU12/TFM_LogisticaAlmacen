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
    const arrWarehouses=[];
    for (let item of req.body.users_warehouses) {
      console.log(item);
      const result = await register(item);
      const uwarehouse = await getByIdUwarehouse(result.insertId)
      arrWarehouses.push(uwarehouse);
    }
    res.json(arrWarehouses);
  } catch (error) {
      res.json({ fatal: error.message });
  }
});



module.exports = router;