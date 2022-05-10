const router = require("express").Router();
const { uploadAvatar, getUsers, createAdmin, getAdmins, newsletterSubscription, removeAdminController, deleteUserController } = require("../controllers/users");

const auth = require("../middlewares/auth");

const schemaValidator = require("../middlewares/schemaValidator");
const { subscribeEmailSchema } = require("../schemas/user");

router.get("/", auth, getUsers);
router.put("/upload-avatar/:id", auth, uploadAvatar);
router.post("/admin", auth, createAdmin);
router.post("/admin/remove", auth, removeAdminController);
router.get("/admin", auth, getAdmins);
router.delete("/:id", auth, deleteUserController);
router.post("/email/subscribe", schemaValidator(subscribeEmailSchema, "body"), newsletterSubscription);
module.exports = router;
