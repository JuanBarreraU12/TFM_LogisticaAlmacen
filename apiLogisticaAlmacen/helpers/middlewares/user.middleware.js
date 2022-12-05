const jwt = require('jsonwebtoken');
// const dayjs = require('dayjs');
const { unauthorize } = require("../validators");
const { getById } = require('../../models/user.model');
const { getRolById } = require('../../models/role.model');

const checkToken = async (req, res, next) => {
    // Comprobar si el token esta definido en la cabecera
    if (!req.headers['authorization']) {
        return unauthorize(res, "The user's token is required");
    }

    // Comprobar si el token es válido
    const { authorization: token } = req.headers;
    let obj;
    try {
        obj = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        return unauthorize(res, "The token isn't valid");
    }

    // Comprobar la expiración del token
    // if (obj.expiration_date < dayjs().unix()) {
    //     return unauthorize(res, "The token has expired");
    // }

    req.user = await getById(obj.user_id);
    next();
}

const checkRole = (roles) => {
    return async (req, res, next) => {
        // Se obtiene el rol
        const role = await getRolById(req.user.roleId);
        // Comprobar si el rol del usuario logueado se encuentra dentro de los roles permitidos
        if (!roles.includes(role.name)) {
            return unauthorize(res, 'Restricted access');
        }
        next();
    }
}

module.exports = {
    checkToken,
    checkRole
}