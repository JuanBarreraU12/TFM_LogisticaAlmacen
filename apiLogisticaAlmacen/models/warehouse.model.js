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

const deleteById = (warehouseId) => {
  return executeQuery('DELETE FROM warehouses WHERE id = ?', [warehouseId]);
}

const update = ({description, address, id }) => {
  return executeQuery('UPDATE gestion_almacen.warehouses SET description = ?, address =? where id =?',[description, address, id]);
}

const getWarehousebyIdEmployee = (employeeId) => { 
  return executeQuery('select w.id, w.description, w.address from gestion_almacen.employees as e inner join gestion_almacen.users as u on e.id=u.employees_id inner join gestion_almacen.users_warehouses as uw on u.id=uw.users_id inner join gestion_almacen.warehouses as w on w.id=uw.warehouses_id where e.id= ?', [employeeId]);
}


module.exports = {
  getAll,
  getWareHouseById,
  create,
  update,  
  deleteById,
  getWarehousebyIdEmployee
}