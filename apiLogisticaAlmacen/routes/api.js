const router = require('express').Router();

router.use('/employee', require('./api/employee'));
router.use('/users', require('./api/users'));

module.exports = router;