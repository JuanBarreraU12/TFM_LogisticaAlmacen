const router = require('express').Router();
const { serverError, notFound } = require('../../helpers/validators');
const { create, getById, getAll, update, deleteById,updateState } = require('../../models/order.model');
const { existsOrder } = require('../../helpers/middlewares/order.middleware');

router.get('/', async (req, res) => {
    try {
        const orders = await getAll();
        res.json(orders);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await getById(orderId);
        if (!order) return notFound(res, 'El pedido no existe');
        res.json(order);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await create(req.body);
        const order = await getById(result.insertId);
        res.json(order);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.put('/:orderId', existsOrder, async (req, res) => {
    const { orderId } = req.params;
    try {
        const result = await update(orderId, req.body);
        res.json(result);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.put('/:orderId/s', existsOrder, async (req, res) => {
    const { orderId } = req.params;
    try {
        const result = await updateState(orderId, req.body);
        res.json(result);
    } catch (error) {
        serverError(res, error.message);
    }
});



router.delete('/:orderId',
    existsOrder,
    async (req, res) => {
    const { orderId } = req.params;
    try {
        const result = await deleteById(orderId);
        res.json(result);
    } catch (error) {
        serverError(res, error.message);
    }
});

module.exports = router;