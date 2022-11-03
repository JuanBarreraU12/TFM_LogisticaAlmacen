const router = require('express').Router();

router.use('/employee', require('./api/employee'));

module.exports = router;