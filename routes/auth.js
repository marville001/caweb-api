const router = require("express").Router();

const {
    loginController,
    adminLoginController,
    registerController,
    getUserDetails,
    updatePasswordController,
} = require("../controllers/auth");

const schemaValidator = require("../middlewares/schemaValidator");
const { loginSchema, registerSchema, updatePasswordSchema } = require("../schemas/auth");

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/me", auth, getUserDetails);
router.get("/admin/me", auth, admin, getUserDetails);
router.post("/login", schemaValidator(loginSchema, "body"), loginController);
router.post(
    "/admin/login",
    schemaValidator(loginSchema, "body"),
    adminLoginController
);
router.post(
    "/register",
    schemaValidator(registerSchema, "body"),
    registerController
);

router.post(
    "/password-update",
    auth,
    schemaValidator(updatePasswordSchema, "body"),
    updatePasswordController
);

module.exports = router;
