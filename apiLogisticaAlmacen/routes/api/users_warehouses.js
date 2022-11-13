const router = require('express').Router();

const { register } = require('../../models/users_warehouses.model');


router.post('/', async (req, res) => {
  try {
      const result = await register(req.body);
      res.json(result);
  } catch (error) {
      res.json({ fatal: error.message });
  }
});

module.exports = router;