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

module.exports = {
    register,
    getByEmail,
    getByUserId
}