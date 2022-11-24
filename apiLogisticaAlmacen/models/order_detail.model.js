const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = (orderId) => {
    return executeQuery('SELECT od.id, m.name AS material, l.description AS location, ml.id AS materialLocationId, ml.stock, od.quantity FROM orders_details od JOIN materials_locations ml ON od.materials_locations_id = ml.id JOIN materials m ON ml.materials_id = m.id JOIN locations l ON ml.locations_id = l.id WHERE od.orders_id = ?', [orderId]);
}

const getById = (orderId, orderDetailId) => {
    return executeQueryOne('SELECT od.id, m.name AS material, l.description AS location, ml.id AS materialLocationId, ml.stock, od.quantity FROM orders_details od JOIN materials_locations ml ON od.materials_locations_id = ml.id JOIN materials m ON ml.materials_id = m.id JOIN locations l ON ml.locations_id = l.id WHERE od.orders_id = ? AND od.id = ?', [orderId, orderDetailId]);
}

const create = (orderId, { materialLocationId, quantity }) => {
    return executeQuery('INSERT INTO orders_details (materials_locations_id, orders_id, quantity) VALUES (?, ?, ?)', [materialLocationId, orderId, quantity]);
}

const update = (orderId, orderDetailId, { materialLocationId, quantity }) => {
    return executeQuery('UPDATE orders_details SET materials_locations_id = ?, quantity = ? WHERE orders_id = ? AND id = ?', [materialLocationId, quantity, orderId, orderDetailId]);
}

const deleteById = (orderId, orderDetailId) => {
    return executeQuery('DELETE FROM orders_details WHERE orders_id = ? AND id = ?', [orderId, orderDetailId]);
}

const deleteByOrder = (orderId) => {
    return executeQuery('DELETE FROM orders_details WHERE orders_id = ?', [orderId]);
}

const getany =() => {
    return executeQuery('SELECT od.id, m.name AS material, l.description AS location, ml.stock, od.quantity, (m.price * od.quantity) AS total FROM orders_details od JOIN materials_locations ml ON od.materials_locations_id = ml.id JOIN materials m ON ml.materials_id = m.id JOIN locations l ON ml.locations_id = l.id');  

}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    deleteByOrder,
    getany
}