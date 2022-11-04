const { executeQuery, executeQueryOne } = require('../helpers/utils');


const register = ({ user_name, email, password, rol_id, employee_id}) => {
    return executeQuery('insert into user(user_name, email, password, rol_id, employee_id) values(?, ?, ?, ?, ?)', [user_name, email, password, rol_id, employee_id]);
}

const getByEmail = (email) => {
    return executeQueryOne('select * from user where email = ?', [email]);
}

module.exports = {
    register, getByEmail
}