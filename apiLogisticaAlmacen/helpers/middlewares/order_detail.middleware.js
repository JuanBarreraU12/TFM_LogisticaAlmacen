const { getAll } = require("../../models/material_location.model");
const { getById } = require("../../models/order.model");
const { serverError, notFound } = require("../validators");

const availableLocations = async (req, res, next) => {
    const { orderId } = req.params;
    const { material_location } = req.body;
    console.log(material_location);
    try {
        const order = await getById(orderId);
        const locations = await getAll(order.originId);
        const index = locations.findIndex(location => location.id === material_location);
        if (index === -1) return notFound(res, `El campo material_location no es válido para el almacén ${order.origin}`);
        next();
    } catch (error) {
        serverError(res, error.message);
    }
}

module.exports = {
    availableLocations
}