const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery('SELECT * FROM materials');
}

const getById = (materialId) => {
    return executeQueryOne('SELECT * FROM materials WHERE id = ?', [materialId]);
}

const create = ({ name, price, sku, material_type_id, image }) => {
    return executeQuery('INSERT INTO materials (name, price, sku, material_types_id, image) VALUES(?, ?, ?, ?, ?)', [name, price, sku, material_type_id, image]);
}

const update = (materialId, { name, price, sku, material_type_id, image }) => {
    return executeQuery('UPDATE materials SET name = ?, price = ?, sku = ?, material_types_id = ?, image = ? WHERE id = ?', [name, price, sku, material_type_id, image, materialId]);
}

const deleteById = (materialId) => {
    return executeQuery('DELETE FROM materials WHERE id = ?', [materialId]);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
}