const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery('select * from user');
}

const getById = (userId) => {
    return executeQueryOne('select * from user where id = ?', [userId]);
}

const create = ({ user_name, password, rol_id, employee_id }) => {
    return executeQuery('insert into user(user_name, password, rol_id, employee_id) values(?, ?, ?, ?)', [user_name, password, rol_id, employee_id]);
}

const update = (userId, { user_name, password, rol_id, employee_id }) => {
    return executeQuery('update user set user_name = ?, password = ?, rol_id = ?, employee_id = ? where id = ?', [user_name, password, rol_id, employee_id, userId]);
}

const deleteById = (userId) => {
    return executeQuery('delete from user where id = ?', [userId]);
}

module.exports = {
    getAll, getById, create, update, deleteById
}