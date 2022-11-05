const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getRolById = (rolId) => {
    return executeQueryOne('select * from rol where id = ?', [rolId]);
}

module.exports = {
  getRolById
}