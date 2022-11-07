const router = require('express').Router();

router.use('/employees', require('./api/employees'));
router.use('/users', require('./api/users'));

module.exports = router;