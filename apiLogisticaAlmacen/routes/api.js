const router = require('express').Router();

router.use('/employees', require('./api/employees'));
router.use('/users', require('./api/users'));
router.use('/materials', require('./api/materials'));
router.use('/materials-locations', require('./api/materials_locations'));
router.use('/orders', require('./api/orders'));
router.use('/orders-details', require('./api/orders_details'));
router.use('/warehouses', require('./api/warehouses'));
router.use('/roles', require('./api/roles'));
router.use('/users-warehouses', require('./api/users_warehouses'));
router.use('/locations', require('./api/locations'));

module.exports = router;