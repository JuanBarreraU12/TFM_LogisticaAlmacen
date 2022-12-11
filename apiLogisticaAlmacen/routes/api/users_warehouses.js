const router = require("express").Router();

const { checkRole } = require("../../helpers/middlewares/user.middleware");
const { serverError } = require("../../helpers/validators");
const {
    create,
    getById,
    getAll,
    deleteById,
    deleteWarehousesByUserId,
    getbyuserId,
} = require("../../models/users_warehouses.model");

router.get("/", async (req, res) => {
    try {
        const usersWarehouses = await getAll();
        res.json(usersWarehouses);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const array = [];
        for (let item of req.body.users_warehouses) {
            const result = await create(item);
            const userWarehouse = await getById(result.insertId);
            array.push(userWarehouse);
        }
        res.json(array);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.put("/", async (req, res) => {
    try {
        const array = [];
        const userId = req.body.userId;
        const deleteWarehouses = await deleteWarehousesByUserId(userId);

        for (let item of req.body.users_warehouses) {
            const result = await create(item);
            const userWarehouse = await getById(result.insertId);
            array.push(userWarehouse);
        }
        res.json(array);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.delete("/:userWarehouseId", checkRole(["Jefe"]), async (req, res) => {
    try {
        const { userWarehouseId } = req.params;
        const result = await deleteById(userWarehouseId);
        res.json(result);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const usersWarehouses = await getbyuserId(userId);
        res.json(usersWarehouses);
    } catch (error) {
        serverError(res, error.message);
    }
});

module.exports = router;
