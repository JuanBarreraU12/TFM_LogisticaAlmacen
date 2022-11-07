const { executeQueryOne } = require('../helpers/utils');

const getRolById = (rolId) => {
    return executeQueryOne('SELECT * FROM roles WHERE id = ?', [rolId]);
}

module.exports = {
  getRolById
}