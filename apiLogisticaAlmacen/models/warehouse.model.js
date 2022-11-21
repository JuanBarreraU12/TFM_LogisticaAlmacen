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

const update = ({description, address,id }) => {
  return executeQuery('UPDATE gestion_almacen.warehouses SET description = ?, address =? where id =?',[description, address, id]);
}
module.exports = {
  getAll,
  getWareHouseById,
  create,
  update
}