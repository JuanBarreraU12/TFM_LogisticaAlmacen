const { getById } = require("../../models/order.model");
const { notFound, serverError } = require("../validators");

const existsOrder = async (req, res, next) => {
    const { orderId } = req.params;
    try {
        const order = await getById(orderId);
        if (!order) return notFound(res, "The order doesn't exist");
        next();
    } catch (error) {
        serverError(res, error.message);
    }
}

module.exports = {
    existsOrder
}