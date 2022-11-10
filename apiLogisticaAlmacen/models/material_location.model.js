const { executeQuery } = require('../helpers/utils');

const getAll = () => {
    return executeQuery('SELECT ml.id, m.name AS material, m.price, m.sku, l.description AS location, ml.stock FROM materials_locations ml JOIN materials m ON ml.materials_id = m.id JOIN locations l ON ml.locations_id = l.id');
}

const getByWarehouse = (warehouseId, { locationId, materialId }) => {
    let and = "";
    let fields = [];
    if (locationId) {
        and += " AND l.id = ?";
        fields.push(locationId);
    }

    if (materialId) {
        and += " AND m.id = ?";
        fields.push(materialId);
    }
    return executeQuery(`SELECT ml.id, m.name AS material, m.price, m.sku, l.description AS location, ml.stock FROM materials_locations ml JOIN materials m ON ml.materials_id = m.id JOIN locations l ON ml.locations_id = l.id JOIN warehouses w ON l.warehouses_id = w.id WHERE w.id = ? ${and}`, [warehouseId, ...fields]);
}

const create = ({ material_id, location_id, stock }) => {
    return executeQuery('INSERT INTO materials_locations (materials_id, locations_id, stock) VALUES (?, ?, ?)', [material_id, location_id, stock]);
}

module.exports = {
    create,
    getAll,
    getByWarehouse
}