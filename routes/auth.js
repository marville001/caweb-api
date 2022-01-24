const router = require("express").Router();
const { loginController, registerController } = require("../controllers/auth");

const schemaValidator = require("../middlewares/schemaValidator");
const { loginSchema } = require("../schemas/auth");

router.post("/login", schemaValidator(loginSchema, "body"), loginController);
router.post("/register", registerController);

module.exports = router;