const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery('SELECT o.id, o.out_date, o.truck_plate, o.comment, s.id AS stateId, s.name AS state, w.id AS originId ,w.description AS origin, wd.id AS destinyId ,wd.description AS destiny FROM orders o LEFT JOIN warehouses w ON o.warehouses_id_origin = w.id LEFT JOIN warehouses wd ON o.warehouses_id_destiny = wd.id JOIN order_states s ON o.order_states_id = s.id ORDER BY o.id');
}

const getById = (orderId) => {
    return executeQueryOne('SELECT o.id, o.out_date, o.truck_plate, o.comment, s.id AS stateId, s.name AS state, w.id AS originId, w.description AS origin, wd.id AS destinyId, wd.description AS destiny FROM orders o LEFT JOIN warehouses w ON o.warehouses_id_origin = w.id LEFT JOIN warehouses wd ON o.warehouses_id_destiny = wd.id JOIN order_states s ON o.order_states_id = s.id WHERE o.id = ? ORDER BY o.id', [orderId]);
}

const getByUser = (userId) => {
    return executeQuery('SELECT o.id, o.out_date, o.truck_plate, o.comment, s.id AS stateId, s.name AS state, w.id AS originId ,w.description AS origin, wd.id AS destinyId ,wd.description AS destiny FROM orders o LEFT JOIN warehouses w ON o.warehouses_id_origin = w.id LEFT JOIN warehouses wd ON o.warehouses_id_destiny = wd.id JOIN users_warehouses uw ON uw.warehouses_id = w.id JOIN order_states s ON o.order_states_id = s.id WHERE uw.users_id = ? ORDER BY o.id', [userId]);
}

const getOrdersOut = (userId) => {
    return executeQuery('SELECT o.id, o.out_date, o.truck_plate, o.comment, s.id AS stateId, s.name AS state, w.id AS originId ,w.description AS origin, wd.id AS destinyId ,wd.description AS destiny FROM orders o LEFT JOIN warehouses w ON o.warehouses_id_origin = w.id LEFT JOIN warehouses wd ON o.warehouses_id_destiny = wd.id JOIN users_warehouses uw ON uw.warehouses_id = w.id JOIN order_states s ON o.order_states_id = s.id WHERE uw.users_id = ? AND s.id = 2 ORDER BY o.id', [userId]);
}

const getOrdersIn = (userId) => {
    return executeQuery('SELECT o.id, o.out_date, o.truck_plate, o.comment, s.id AS stateId, s.name AS state, w.id AS originId ,w.description AS origin, wd.id AS destinyId ,wd.description AS destiny FROM orders o LEFT JOIN warehouses w ON o.warehouses_id_origin = w.id LEFT JOIN warehouses wd ON o.warehouses_id_destiny = wd.id JOIN users_warehouses uw ON uw.warehouses_id = wd.id JOIN order_states s ON o.order_states_id = s.id WHERE uw.users_id = ? AND s.id = 5 ORDER BY o.id', [userId]);
}

const create = ({ out_date, truck_plate, comment, stateId, originId, destinyId }) => {
    return executeQuery('INSERT INTO orders (out_date, truck_plate, comment, order_states_id, warehouses_id_origin, warehouses_id_destiny) VALUES (?, ?, ?, ?, ?, ?)', [out_date, truck_plate, comment, stateId, originId, destinyId]);
}

const update = (orderId, { out_date, truck_plate, comment, stateId, originId, destinyId }) => {
    return executeQuery('UPDATE orders SET out_date = ?, truck_plate = ?, comment = ?, order_states_id = ?, warehouses_id_origin = ?, warehouses_id_destiny = ? WHERE id = ?', [out_date, truck_plate, comment, stateId, originId, destinyId, orderId]);
}

const updateState = (orderId, { stateId }) => {
    return executeQuery('UPDATE orders SET order_states_id = ? WHERE id = ?', [stateId, orderId]);
}

const updateComment = (orderId, { comment }) => {
    return executeQuery('UPDATE orders SET comment = ? WHERE id = ?', [comment, orderId]);
}

const deleteById = (orderId) => {
  return executeQuery('DELETE FROM orders WHERE id = ?', [orderId]);
}

module.exports = {
    getAll,
    getById,
    getByUser,
    getOrdersIn,
    getOrdersOut,
    create,
    update,
    updateState,
    deleteById,
    updateComment
}