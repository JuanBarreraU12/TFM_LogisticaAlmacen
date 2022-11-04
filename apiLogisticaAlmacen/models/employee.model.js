const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getEmployeeById = (employeeId) => {
    return executeQueryOne('select * from employee where id = ?', [employeeId]);
}

const getAll = () => {
    return executeQuery('select * from employee');
}

const getById = (employeeId) => {
    return executeQueryOne('select * from employee where id = ?', [employeeId]);
}

const create = ({ name, last_name, email, dni, cell_phone }) => {
    return executeQuery('insert into employee(name, last_name, email, dni, cell_phone) values(?, ?, ?, ?, ?)', [name, last_name, email, dni, cell_phone]);
}

const update = (employeeId, { name, last_name, email, dni, cell_phone }) => {
    return executeQuery('update employee set name = ?, last_name = ?, email = ?, dni = ?, cell_phone = ? where id = ?', [name, last_name, email, dni, cell_phone, employeeId]);
}

const deleteById = (employeeId) => {
    return executeQuery('delete from employee where id = ?', [employeeId]);
}

module.exports = {
    getAll, getById, create, update, deleteById,getEmployeeById
}