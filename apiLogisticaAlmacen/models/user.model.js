const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery('SELECT u.id, u.name, u.first_last_name, u.second_last_name, u.dni, u.phone, u.birth_date, u.email, u.password, r.id as roleId, r.name as role FROM gestion_almacen.users u JOIN roles r ON u.roles_id = r.id');
}

const getById = (userId) => {
    return executeQueryOne('SELECT u.id, u.name, u.first_last_name, u.second_last_name, u.dni, u.phone, u.birth_date, u.email, u.password, r.id as roleId, r.name as role FROM gestion_almacen.users u JOIN roles r ON u.roles_id = r.id WHERE u.id = ?', [userId]);
}

const getByEmail = (email) => {
    return executeQueryOne('SELECT u.id, u.name, u.first_last_name, u.second_last_name, u.dni, u.phone, u.birth_date, u.email, u.password, r.id as roleId, r.name as role FROM gestion_almacen.users u JOIN roles r ON u.roles_id = r.id WHERE u.email = ?', [email]);
}

const create = ({ name, first_last_name, second_last_name, dni, phone, birth_date, email, password, roleId}) => {
    return executeQuery('INSERT INTO users(name, first_last_name, second_last_name, dni, phone, birth_date, email, password, roles_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, first_last_name, second_last_name, dni, phone, birth_date, email, password, roleId]);
}

const update = (userId, { name, first_last_name, second_last_name, dni, phone, birth_date, email, password, roleId }) => {
    return executeQuery('UPDATE users SET name = ?, first_last_name = ?, second_last_name = ?, dni = ?, phone = ?, birth_date = ?, email = ?, password = ?, roles_id = ? WHERE id = ?', [name, first_last_name, second_last_name, dni, phone, birth_date, email, password, roleId, userId]);
}

const deleteById = (userId) => {
    return executeQuery('DELETE FROM users WHERE id = ?', [userId]);
}

const updateRol = (rolId, employeeId) => {
  return executeQuery('UPDATE gestion_almacen.users SET roles_id = ? WHERE employees_id = ?', [rolId, employeeId]);
}
 
module.exports = {
    getAll,
    getByEmail,
    getById,
    create,
    update,
    deleteById,
    updateRol
}