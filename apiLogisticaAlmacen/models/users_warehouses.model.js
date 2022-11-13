const { executeQuery, executeQueryOne } = require('../helpers/utils');

const register = ({ user_id, warehouse_id}) => {
  return executeQuery('insert into gestion_almacen.users_warehouses(users_id,warehouses_id) values(?,?)', [user_id, warehouse_id]);
}

const getByIdUwarehouse = (uWerehouseId) => {
  return executeQueryOne('SELECT * FROM users_warehouses WHERE id = ?', [uWerehouseId]);
}

module.exports = {
  register,
  getByIdUwarehouse
}