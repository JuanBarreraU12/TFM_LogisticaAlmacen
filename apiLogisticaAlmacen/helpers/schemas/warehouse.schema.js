const newWarehouse = {
  description: {
    exists: true,
    errorMessage: "Warehouse's description is required",
  },
  address: {
    exists: true,
    errorMessage: "Warehouse's address is required",
  },
};
module.exports = {
  newWarehouse,
};
