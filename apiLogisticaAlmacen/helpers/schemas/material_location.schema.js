const newMaterialLocation = {
    material_id: {
        exists: {
            errorMessage: 'El id del material es obligatorio'
        },
        isInt: {
            errorMessage: 'El id del material debe ser un número entero'
        }
    },
    location_id: {
        exists: {
            errorMessage: 'El id de la localización es obligatorio'
        },
        isInt: {
            errorMessage: 'El id de la localización debe ser un número entero'
        }
    },
    stock: {
        exists: {
            errorMessage: 'El stock del material es obligatorio'
        },
        isInt: {
            errorMessage: 'El stock del material debe ser un número entero'
        }
    }
}

const warehouseParams = {
    warehouseId: {
        isInt: {
            errorMessage: 'El id del almacén debe ser un número entero'
        },
        toInt: true
    },
    locationId: {
        in: ['query'],
        custom: {
            options: (value) => {
                if (!value) return true;
                return Number.isInteger(parseInt(value));
            },
            errorMessage: 'El id de la localización debe ser un número entero'
        },
        toInt: true
    }
}

module.exports = {
    newMaterialLocation,
    warehouseParams
}