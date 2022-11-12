const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
  return executeQuery('select * from gestion_almacen.locations');
}

const getLocationByWarehouseId = (warehouseId) => {
  return executeQuery('select * from gestion_almacen.locations  where warehouses_id= ?', [warehouseId]);
}

module.exports = {
  getAll,
  getLocationByWarehouseId
}