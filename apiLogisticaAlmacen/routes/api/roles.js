const router = require('express').Router();

const { getAll } = require('../../models/role.model');

router.get('/', (req, res) => {
  getAll()
      .then(rol => {
          res.json(rol);
      })
      .catch((error) => {
          res.json({ fatal: error.message });
      });
});

module.exports = router;