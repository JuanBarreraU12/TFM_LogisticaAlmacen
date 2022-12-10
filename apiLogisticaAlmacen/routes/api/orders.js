const router = require("express").Router();
const { serverError, notFound } = require("../../helpers/validators");
const {
  create,
  getById,
  getAll,
  update,
  deleteById,
  updateState,
  updateComment,
} = require("../../models/order.model");
const { existsOrder } = require("../../helpers/middlewares/order.middleware");
const { checkRole } = require("../../helpers/middlewares/user.middleware");
const { sendEmail } = require("../../helpers/utils");

router.get("/", checkRole(["Operario", "Encargado"]), async (req, res) => {
  try {
    const orders = await getAll();
    res.json(orders);
  } catch (error) {
    serverError(res, error.message);
  }
});

router.get(
  "/:orderId",
  checkRole(["Operario", "Encargado"]),
  async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await getById(orderId);
      if (!order) return notFound(res, "El pedido no existe");
      res.json(order);
    } catch (error) {
      serverError(res, error.message);
    }
  }
);

router.post("/", checkRole(["Operario"]), async (req, res) => {
  try {
    const result = await create(req.body);
    const order = await getById(result.insertId);
    res.json(order);
  } catch (error) {
    serverError(res, error.message);
  }
});

router.put(
  "/:orderId",
  checkRole(["Operario", "Encargado"]),
  existsOrder,
  async (req, res) => {
    const { orderId } = req.params;
    try {
      const result = await update(orderId, req.body);
      res.json(result);
    } catch (error) {
      serverError(res, error.message);
    }
  }
);




router.put('/:orderId/c', checkRole(["Encargado"]), existsOrder, async (req, res) => {
  const { orderId } = req.params;
  try {
      const result = await updateComment(orderId, req.body);
      res.json(result);
  } catch (error) {
      serverError(res, error.message);
  }
});






router.patch(
  "/:orderId",
  checkRole(["Operario", "Encargado"]),
  existsOrder,
  async (req, res) => {
    const { orderId } = req.params;
    try {
      const result = await updateState(orderId, req.body);
      const info = await sendEmail(req.user);
      console.log(info);
      res.json(result);
    } catch (error) {
      serverError(res, error.message);
    }
  }
);

router.delete(
  "/:orderId",
  checkRole(["Operario"]),
  existsOrder,
  async (req, res) => {
    const { orderId } = req.params;
    try {
      const result = await deleteById(orderId);
      res.json(result);
    } catch (error) {
      serverError(res, error.message);
    }
  }
);

module.exports = router;
