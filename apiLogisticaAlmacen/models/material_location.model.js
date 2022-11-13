const { executeQuery } = require('../helpers/utils');

const getAll = (warehouseId) => {
    return executeQuery('SELECT ml.id, m.id AS materialId, m.name AS material, m.price, m.sku, l.id AS locationId, l.description AS location, ml.stock FROM materials_locations ml JOIN materials m ON ml.materials_id = m.id JOIN locations l ON ml.locations_id = l.id JOIN warehouses w ON l.warehouses_id = w.id WHERE w.id = ?', [warehouseId]);
}

const getByLocationWithPages = (warehouseId, locationId, page, limit) => {
    return executeQuery('SELECT ml.id, m.id AS materialId, m.name AS material, m.price, m.sku, l.id AS locationId, l.description AS location, ml.stock FROM materials_locations ml JOIN materials m ON ml.materials_id = m.id JOIN locations l ON ml.locations_id = l.id JOIN warehouses w ON l.warehouses_id = w.id WHERE w.id = ? AND l.id = ? LIMIT ? OFFSET ?', [warehouseId, locationId, limit, (page - 1) * 10]);
}

const create = ({ materialId, locationId, stock }) => {
    return executeQuery('INSERT INTO materials_locations (materials_id, locations_id, stock) VALUES (?, ?, ?)', [materialId, locationId, stock]);
}

module.exports = {
    create,
    getAll,
    getByLocationWithPages
}