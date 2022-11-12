const router = require('express').Router();

router.use('/employees', require('./api/employees'));
router.use('/users', require('./api/users'));
router.use('/warehouses', require('./api/warehouses'));
router.use('/roles', require('./api/roles'));
module.exports = router;