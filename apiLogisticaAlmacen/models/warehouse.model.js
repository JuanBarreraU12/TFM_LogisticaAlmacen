const { executeQuery, executeQueryOne } = require('../helpers/utils');


const getAll = () => {
  return executeQuery('SELECT * FROM warehouses');
}

const getById = (warehouseId) => {
  return executeQueryOne('SELECT * FROM warehouses WHERE id= ?', [warehouseId]);
}

const create = ({ description, address }) => {
  return executeQuery('INSERT INTO warehouses(description, address) VALUES(?, ?)', [description, address]);
}

const deleteById = (warehouseId) => {
  return executeQuery('DELETE FROM warehouses WHERE id = ?', [warehouseId]);
}

const update = (warehouseId, {description, address}) => {
  return executeQuery('UPDATE warehouses SET description = ?, address =? WHERE id =?',[description, address, warehouseId]);
}

const getByUser = (userId) => { 
  return executeQuery('SELECT w.id, w.description, w.address, uw.id as user_warehouse_id FROM warehouses w JOIN users_warehouses uw ON uw.warehouses_id = w.id WHERE uw.users_id = ?', [userId]);
}


module.exports = {
  getAll,
  getById,
  getByUser,
  create,
  update,  
  deleteById
}