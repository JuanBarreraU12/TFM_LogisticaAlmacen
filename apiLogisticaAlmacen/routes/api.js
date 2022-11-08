const router = require('express').Router();

router.use('/employees', require('./api/employees'));
router.use('/users', require('./api/users'));
router.use('/materials', require('./api/materials'));

module.exports = router;