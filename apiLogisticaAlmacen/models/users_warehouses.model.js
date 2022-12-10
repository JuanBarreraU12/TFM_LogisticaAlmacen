const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
  return executeQuery('SELECT * from gestion_almacen.users_warehouses');
}

const getById = (userWarehouseId) => {
  return executeQueryOne('SELECT * FROM users_warehouses WHERE id = ?', [userWarehouseId]);
}

const deleteWarehousesByUserId = (userId) => {
  return executeQuery('delete FROM gestion_almacen.users_warehouses WHERE users_id = ?', [userId]);
}

const create = ({ users_id, warehouse_id}) => {
  return executeQuery('INSERT INTO users_warehouses(users_id,warehouses_id) VALUES(?,?)', [users_id, warehouse_id]);
}

const deleteById = (userWarehouseId) => {
  return executeQuery('DELETE FROM users_warehouses WHERE id = ?', [userWarehouseId]);
}

module.exports = {
  create,
  getById,
  getAll,
  deleteById,
  deleteWarehousesByUserId
}