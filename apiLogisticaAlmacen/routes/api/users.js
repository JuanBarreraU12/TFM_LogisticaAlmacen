const router = require("express").Router();
const bcrypt = require("bcryptjs");

const {
  create,
  getByEmail,
  getById,
  getAll,
  update,
  deleteById,
} = require("../../models/user.model");
const {
  serverError,
  unauthorize,
  badRequest,
} = require("../../helpers/validators");
const { createToken } = require("../../helpers/utils");
const { checkSchema } = require("express-validator");
const { loginUser } = require("../../helpers/schemas/user.schema");
const { checkToken, checkRole } = require("../../helpers/middlewares/user.middleware");

router.get("/",
  checkToken,
  checkRole(['Jefe']),
  async (req, res) => {
  try {
    const users = await getAll();
    res.json(users);
  } catch (error) {
    serverError(res, error.message);
  }
});

router.get("/:userId",
  checkToken,
  async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await getById(userId);
    res.json(user);
  } catch (error) {
    serverError(res, error.message);
  }
});

router.post("/register",
  checkToken,
  checkRole(['Jefe']),
  async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const result = await create(req.body);
    const user = await getById(result.insertId);
    res.json(user);
  } catch (error) {
    serverError(res, error.message);
  }
});

router.put('/:userId',
  checkToken,
  checkRole(['Jefe']),
  async (req, res) => {
  try {
    const { userId } = req.params;
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const result = await update(userId, req.body);
    res.json(result);
  } catch (error) {
    serverError(res, error.message);
  }
})

router.post("/login",
  checkSchema(loginUser),
  badRequest, async (req, res) => {
  const { email, password } = req.body;
  const user = await getByEmail(email);
  if (!user) return unauthorize(res, "Incorrect email and/or password");

  const iguales = bcrypt.compareSync(password, user.password);
  if (!iguales) {
    return unauthorize(res, "Incorrect email and/or password");
  }

  const response = {
    success: true,
    token: createToken(user),
  };

  res.json(response);
});

router.delete('/:userId',
  checkToken,
  checkRole(['Jefe']),
  async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await deleteById(userId);
    res.json(result);
  } catch (error) {
    serverError(res, error.message);
  }
})

module.exports = router;
