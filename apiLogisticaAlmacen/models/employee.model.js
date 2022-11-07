const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getEmployeeById = (employeeId) => {
    return executeQueryOne('SELECT * FROM employees WHERE id = ?', [employeeId]);
}

const getAll = () => {
    return executeQuery('SELECT * FROM employees');
}

const getById = (employeeId) => {
    return executeQueryOne('SELECT * FROM employees WHERE id = ?', [employeeId]);
}

const create = ({ name, first_last_name, second_last_name, email, dni, cell_phone, birth_date }) => {
    return executeQuery('INSERT INTO employees(name, first_last_name, second_last_name, email, dni, cell_phone, birth_date) VALUES(?, ?, ?, ?, ?, ?, ?)', [name, first_last_name, second_last_name, email, dni, cell_phone, birth_date]);
}

const update = (employeeId, { name, first_last_name, second_last_name, email, dni, cell_phone, birth_date }) => {
    return executeQuery('UPDATE employees SET name = ?, first_last_name = ?, second_last_name = ?, email = ?, dni = ?, cell_phone = ?, birth_date = ? WHERE id = ?', [name, first_last_name, second_last_name, email, dni, cell_phone, birth_date, employeeId]);
}

const deleteById = (employeeId) => {
    return executeQuery('DELETE FROM employees WHERE id = ?', [employeeId]);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getEmployeeById
}