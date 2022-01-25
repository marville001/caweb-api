const router = require("express").Router();
const { loginController, registerController } = require("../controllers/auth");

const schemaValidator = require("../middlewares/schemaValidator");
const { loginSchema, registerSchema } = require("../schemas/auth");

const auth = require("../middlewares/auth")

router.get("/me", auth, getUserDetails);
router.post("/login", schemaValidator(loginSchema, "body"), loginController);
router.post("/register", schemaValidator(registerSchema, "body"), registerController);

module.exports = router;