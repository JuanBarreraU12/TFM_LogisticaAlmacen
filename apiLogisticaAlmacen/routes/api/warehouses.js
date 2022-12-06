const router = require("express").Router();
const { checkSchema } = require("express-validator");
const {
  badRequest,
  serverError,
  notFound,
} = require("../../helpers/validators");
const { newWarehouse } = require("../../helpers/schemas/warehouse.schema");
const {
  getAll,
  create,
  update,
  deleteById,
  getById,
  getByUser,
} = require("../../models/warehouse.model");
const { checkRole } = require("../../helpers/middlewares/user.middleware");

router.get("/",
  checkRole(['Jefe', 'Operario']),
  async (req, res) => {
  try {
    const warehouses = await getAll();
    res.json(warehouses);
  } catch (error) {
    serverError(res, error.message);
  }
});

router.get('/', (req, res) =>  {
  getAll()
      .then(async (warehouse) => {
        let respuesta= [];
        for(let element of warehouse) {
          const locations = await getLocationByWarehouseId(element.id);
          const item={
            "id" : element.id,
            "description": element.description,
            "address":element.address,
            locations
          }
          respuesta.push(item);
        };
        res.json(respuesta);
      })
      .catch((error) => {
          res.json({ fatal: error.message });
      });
});

router.get('/employee/:employeeId', async (req, res) => {
  const { employeeId } = req.params;
  const warehouse = await getWarehousebyIdEmployee(employeeId);
  console.log(warehouse)
  let respuesta = [];
  for (let item of warehouse) {
    console.log(item)
   

    const response = {
      "id": item.id,
      "description": item.description,
      "address": item.address
    }
    respuesta.push(response)     
  }
  res.json(respuesta)
  
})

router.post('/',
  checkSchema(newWarehouse), badRequest , async (req, res) => {
    try {
      const result = await create(req.body);
      const warehouse = await getWareHouseById(result.insertId);
      res.json(warehouse);
    } catch (error) {
      res.json({ fatal: error.message });
    }
});

router.put('/', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS"); 
  
  const warehouse = req.body;
  const result = await update(warehouse);
  res.json(result);
});

router.delete('/:warehouseId', async (req, res) => {
  const { warehouseId } = req.params;
  try {
    const warehouse = await getById(warehouseId);
    if (!warehouse) return notFound(res, "The warehouse doesn't exist");
    res.json(warehouse);
  } catch (error) {
    serverError(res, error.message);
  }
});

router.get("/users/:userId",
  checkRole(['Jefe', 'Operario']),
  async (req, res) => {
  try {
    const { userId } = req.params;
    const warehouses = await getByUser(userId);
    if (warehouses.length === 0)
      return notFound(res, "This user doesn't have warehouses");
    res.json(warehouses);
  } catch (error) {
    serverError(res, error.message);
  }
});

router.post("/",
  checkRole(['Jefe']),
  checkSchema(newWarehouse),
  badRequest, async (req, res) => {
  try {
    const result = await create(req.body);
    const warehouse = await getById(result.insertId);
    res.json(warehouse);
  } catch (error) {
    serverError(res, error.message);
  }
});

router.put("/:warehouseId",
  checkRole(['Jefe']),
  async (req, res) => {
  try {
    const { warehouseId } = req.params;
    const result = await update(warehouseId, req.body);
    res.json(result);
  } catch (error) {
    serverError(res, error.message);
  }
});

router.delete("/:warehouseId",
  checkRole(['Jefe']),
  async (req, res) => {
  try {
    const { warehouseId } = req.params;
    const result = await deleteById(warehouseId);
    res.json(result); 
  } catch (error) {
    serverError(res, error.message);
  }
});

module.exports = router;
