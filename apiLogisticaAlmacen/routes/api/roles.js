const router = require("express").Router();

const { checkRole } = require("../../helpers/middlewares/user.middleware");
const { serverError } = require("../../helpers/validators");
const { getAll } = require("../../models/role.model");

router.get("/", checkRole(["Jefe"]), (req, res) => {
  getAll()
    .then((rol) => {
      res.json(rol);
    })
    .catch((error) => {
      serverError(res, error.message);
    });
});

module.exports = router;
