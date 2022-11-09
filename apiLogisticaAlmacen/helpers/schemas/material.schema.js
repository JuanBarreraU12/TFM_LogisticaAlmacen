const newMaterial = {
    name: {
        exists: {
            errorMessage: 'El nombre del material es obligatorio'
        },
        isLength: {
            errorMessage: 'El nombre del material solo permite 45 caracteres',
            options: { max: 45 }
        }
    },
    price: {
        exists: {
            errorMessage: 'El precio del material es obligatorio'
        }
    },
    sku: {
        exists: {
            errorMessage: 'El sku del material es obligatorio'
        },
        isLength: {
            options: { max: 10 },
            errorMessage: 'El sku del material solo puede contener 10 caracteres'
        }
    },
    material_type_id: {
        exists: {
            errorMessage: 'El tipo de material es obligatorio'
        },
        isInt: {
            errorMessage: 'El tipo de material debe ser un número entero'
        }
    }
}

const materialId = {
    materialId: {
        in: [ 'params' ],
        isInt: true,
        errorMessage: 'El id del material no es un número',
        toInt: true
    }
}

module.exports = {
    newMaterial,
    materialId
}