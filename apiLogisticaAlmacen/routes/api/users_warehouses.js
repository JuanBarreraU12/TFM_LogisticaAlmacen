const router = require('express').Router();

const { register, getByIdUwarehouse } = require('../../models/users_warehouses.model');


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