const { getAll } = require("../../models/material_location.model");
const orderModel = require("../../models/order.model");
const orderDetailModel = require('../../models/order_detail.model');
const { serverError, notFound } = require("../validators");

const availableLocations = async (req, res, next) => {
    const { orderId } = req.params;
    const { material_location } = req.body;
    try {
        const order = await orderModel.getById(orderId);
        const locations = await getAll(order.originId);
        const index = locations.findIndex(location => location.id === material_location);
        if (index === -1) return res.status(400).json({error: `El campo material_location no es válido para el almacén ${order.origin}`});
        next();
    } catch (error) {
        serverError(res, error.message);
    }
}

const existsOrderDetail = async (req, res, next) => {
    const { orderId, orderDetailId } = req.params;
    try {
        const detail = await orderDetailModel.getById(orderId, orderDetailId);
        if (!detail) return notFound(res, 'El detalle del pedido no existe');
        next();
    } catch (error) {
        serverError(res, error.message);
    }
}

module.exports = {
    availableLocations,
    existsOrderDetail
}