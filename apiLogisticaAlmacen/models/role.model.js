const { executeQueryOne,executeQuery } = require('../helpers/utils');

const getRolById = (rolId) => {
    return executeQueryOne('SELECT * FROM roles WHERE id = ?', [rolId]);
}

const getAll = () => {
  return executeQuery('select * from gestion_almacen.roles');
}
module.exports = {
  getRolById,
  getAll
}