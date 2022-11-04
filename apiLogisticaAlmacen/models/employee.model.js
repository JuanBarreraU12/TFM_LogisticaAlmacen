const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getEmployeeById = (employeeId) => {
    return executeQueryOne('select * from employee where id = ?', [employeeId]);
}

module.exports = {
  getEmployeeById
}