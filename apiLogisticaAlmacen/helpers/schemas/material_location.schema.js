const newMaterialLocation = {
  materialId: {
    exists: {
      errorMessage: "Material's ID is required",
    },
    isInt: {
      errorMessage: "Material's ID must be an integer number",
    },
  },
  locationId: {
    exists: {
      errorMessage: "Location's ID is required",
    },
    isInt: {
      errorMessage: "Location's ID must be an integer number",
    },
  },
  stock: {
    exists: {
      errorMessage: "Material's stock is required",
    },
    isInt: {
      errorMessage: "Material's stock must be an integer number",
    },
  },
};

const warehouseParam = {
  warehouseId: {
    in: ["params"],
    isInt: {
      errorMessage: "Warehouse's ID must be an integer number",
    },
    toInt: true,
  },
};

const locationParam = {
  locationId: {
    in: ["params"],
    isInt: {
      errorMessage: "Location's ID must be an integer number",
    },
    toInt: true,
  },
};

module.exports = {
  newMaterialLocation,
  warehouseParam,
  locationParam,
};
