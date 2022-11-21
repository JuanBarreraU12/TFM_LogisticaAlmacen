const { executeQuery, executeQueryOne } = require('../helpers/utils');


const getAll = () => {
  return executeQuery('select * from gestion_almacen.warehouses');
}

const getWareHouseById = (warehouseId) => {
  return executeQueryOne('select * from gestion_almacen.warehouses where id= ?', [warehouseId]);
}

const create = ({ description, address }) => {
  return executeQuery('INSERT INTO warehouses(description, address) values(?, ?)', [description, address]);
}

const update = (warehouseId, { description, address }) => {
  return executeQuery('UPDATE warehouses SET description = ?, address = ?'[description, address, warehouseId]);
}

const deleteById = (warehouseId) => {
  return executeQuery('DELETE FROM warehouses WHERE id = ?', [warehouseId]);
}

module.exports = {
  getAll,
  getWareHouseById,
  create,
  update,  
  deleteById
}