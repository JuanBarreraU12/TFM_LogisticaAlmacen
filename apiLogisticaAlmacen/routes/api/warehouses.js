const router = require('express').Router();

const { getLocationByWarehouseId } = require('../../models/location.model');
const { getAll,getWareHouseById } = require('../../models/warehouse.model');

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

module.exports = router;