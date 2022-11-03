const { executeQuery, executeQueryOne } = require('../helpers/utils');


const register = ({ user_name, password, rol_id, employee_id }) => {
    return executeQuery('insert into user(user_name, password, rol_id, employee_id) values(?, ?, ?, ?)', [user_name, password, rol_id, employee_id]);
}




module.exports = {
    register
}