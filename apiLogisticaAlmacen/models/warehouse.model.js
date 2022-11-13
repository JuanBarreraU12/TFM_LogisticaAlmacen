const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery('SELECT * FROM warehouses');
}

module.exports = {
    getAll
}