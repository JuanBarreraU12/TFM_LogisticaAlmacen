const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery('SELECT o.id, DATE_FORMAT(o.out_date, "%d/%m/%Y") as out_date, o.truck_plate, o.comment, s.name AS state, w.id AS originId ,w.description AS origin, wd.id AS destinyId ,wd.description AS destiny FROM orders o JOIN warehouses w ON o.warehouses_id_origin = w.id JOIN warehouses wd ON o.warehouses_id_destiny = wd.id JOIN order_states s ON o.order_states_id = s.id ORDER BY o.id');
}

const getById = (orderId) => {
    return executeQueryOne('SELECT o.id, DATE_FORMAT(o.out_date, "%d/%m/%Y") as out_date, o.truck_plate, o.comment, s.name AS state, w.id AS originId ,w.description AS origin, wd.id AS destinyId ,wd.description AS destiny FROM orders o JOIN warehouses w ON o.warehouses_id_origin = w.id JOIN warehouses wd ON o.warehouses_id_destiny = wd.id JOIN order_states s ON o.order_states_id = s.id WHERE o.id = ? ORDER BY o.id', [orderId]);
}

const create = ({ out_date, truck_plate, comment, state, origin, destiny }) => {
    return executeQuery('INSERT INTO orders (out_date, truck_plate, comment, order_states_id, warehouses_id_origin, warehouses_id_destiny) VALUES (?, ?, ?, ?, ?, ?)', [out_date, truck_plate, comment, state, origin, destiny]);
}

const update = (orderId, { out_date, truck_plate, comment, state, origin, destiny }) => {
    return executeQuery('UPDATE orders SET out_date = ?, truck_plate = ?, comment = ?, order_states_id = ?, warehouses_id_origin = ?, warehouses_id_destiny = ? WHERE id = ?', [out_date, truck_plate, comment, state, origin, destiny, orderId]);
}

const deleteById = (orderId) => {
    return executeQuery('DELETE FROM orders WHERE id = ?', [orderId]);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
}