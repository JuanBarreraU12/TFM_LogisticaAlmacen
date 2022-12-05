const newMaterial = {
  name: {
    exists: {
      errorMessage: "Material's name is required",
    },
    isLength: {
      errorMessage: "The maximum length of the material's name must be 45 characters",
      options: { max: 45 },
    },
  },
  price: {
    exists: {
      errorMessage: "Material's price is required",
    },
  },
  sku: {
    exists: {
      errorMessage: "Material's sku is required",
    },
    isLength: {
      options: { max: 10 },
      errorMessage: "The maximum length of the material's sku must be 10 characters",
    },
  },
  material_type_id: {
    exists: {
      errorMessage: "Material's type is required",
    },
    isInt: {
      errorMessage: "Material's type must be an integer number",
    },
  },
};

const materialId = {
  materialId: {
    in: ["params"],
    isInt: true,
    errorMessage: "Material's ID must be an integer number",
    toInt: true,
  },
};

module.exports = {
  newMaterial,
  materialId,
};
