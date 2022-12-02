const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
  return executeQuery('select * from gestion_almacen.locations');
}

const getLocationByWarehouseId = (warehouseId) => {
  return executeQuery('select * from gestion_almacen.locations  where warehouses_id= ?', [warehouseId]);
}

const getByIdLocation = (locationsId) => {
  return executeQuery('select * from locations WHERE id = ?',[locationsId]);
}

const createLocations = ({description, warehouses_id}) => {
  return executeQuery('INSERT INTO locations (description, warehouses_id) VALUES(?, ?);', [description, warehouses_id]);
}

const updateLocations = (locationsId, { description, warehouses_id }) => {
  return executeQuery('UPDATE locations SET description = ?, warehouses_id = ? WHERE id = ?', [description, warehouses_id,  locationsId]); 
}

const deleteLocations = (locationsId) => {
  return executeQuery('DELETE FROM locations WHERE id = ?', [locationsId]);
}

module.exports = {
  getAll,
  getLocationByWarehouseId,
  createLocations,
  updateLocations,
  deleteLocations,
  getByIdLocation
}