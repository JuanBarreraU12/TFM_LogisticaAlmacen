const { executeQuery, executeQueryOne } = require('../helpers/utils');


const register = ({ username, email, password, role_id, employee_id}) => {
    return executeQuery('INSERT INTO users(username, email, password, roles_id, employees_id) VALUES(?, ?, ?, ?, ?)', [username, email, password, role_id, employee_id]);
}

const getByEmail = (email) => {
    return executeQueryOne('SELECT * FROM users WHERE email = ?', [email]);
}

const getByUserId = (userId) => {
    return executeQueryOne('SELECT * FROM users WHERE id = ?', [userId]);
}

const getuserByIdEmployee = (employeeId) => {
    return executeQueryOne('select * from users where employees_id = ?', [employeeId]);
}

const updateRol = (rolId, employeeId) => {
  return executeQuery('UPDATE gestion_almacen.users SET roles_id = ? WHERE employees_id = ?', [rolId, employeeId]);
}
 
module.exports = {
    register,
    getByEmail,
    getByUserId, 
    getuserByIdEmployee,
    updateRol
}