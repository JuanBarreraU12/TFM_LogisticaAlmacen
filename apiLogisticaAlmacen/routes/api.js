const router = require('express').Router();

router.use('/employees', require('./api/employees'));
router.use('/users', require('./api/users'));
router.use('/materials', require('./api/materials'));
router.use('/materials-locations', require('./api/materials_locations'));
router.use('/orders', require('./api/orders'));

module.exports = router;