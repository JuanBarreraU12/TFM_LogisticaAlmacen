const router = require("express").Router();
const { checkSchema } = require("express-validator");
const { newLocation } = require("../../helpers/schemas/location.schema");
const { badRequest } = require("../../helpers/validators");
const {
    createLocations,
    getByIdLocation,
    updateLocations,
    deleteLocations,
} = require("../../models/location.model");
const { getLocationByWarehouseId } = require("../../models/location.model");

router.get("/:locationId", async (req, res) => {
    const { locationId } = req.params;
    const location = await getByIdLocation(locationId);
    if (location) {
        const response = {
            description: location.description,
        };
        res.json(response);
    } else {
        res.json({ error: "No existe una location con ese Id" });
    }
});

router.get("/warehouse/:warehouseId", async (req, res) => {
    try {
        const { warehouseId } = req.params;
        const location = await getLocationByWarehouseId(warehouseId);
        res.json(location);
    } catch (error) {
        serverError(res, error.message);
    }
});

router.post("/", checkSchema(newLocation), badRequest, async (req, res) => {
    try {
        const result = await createLocations(req.body);
        const location = await getByIdLocation(result.insertId);
        res.json(location);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.put("/:locationsId", async (req, res) => {
    const { locationsId } = req.params;
    const result = await updateLocations(locationsId, req.body);
    res.json(result);
});

router.delete("/:locationsId", async (req, res) => {
    const { locationsId } = req.params;
    const result = await deleteLocations(locationsId);
    res.json(result);
});

module.exports = router;
