const { checkToken, checkRole } = require('../helpers/middlewares/user.middleware');

const router = require('express').Router();

router.use('/users', require('./api/users'));
router.use('/materials', require('./api/materials'));
router.use('/materials-locations', checkToken, require('./api/materials_locations'));
router.use('/orders', checkToken, require('./api/orders'));
router.use('/orders-details', checkToken, require('./api/orders_details'));
router.use('/warehouses', checkToken, require('./api/warehouses'));
router.use('/roles', checkToken, require('./api/roles'));
router.use('/users-warehouses', checkToken, require('./api/users_warehouses'));
router.use('/locations', require('./api/locations'));

module.exports = router;