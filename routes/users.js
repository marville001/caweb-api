const router = require("express").Router();
const { uploadAvatar, getUsers, createAdmin, getAdmins, newsletterSubscription, removeAdminController, deleteUserController, searchUserController, joinSccController } = require("../controllers/users");

const auth = require("../middlewares/auth");

const schemaValidator = require("../middlewares/schemaValidator");
const { subscribeEmailSchema } = require("../schemas/user");

router.get("/", auth, getUsers);
router.put("/upload-avatar/:id", auth, uploadAvatar);
router.put("/join-group/:sid/uid", auth, joinSccController);
router.post("/admin", auth, createAdmin);
router.delete("/admin/:id", auth, removeAdminController);
router.get("/admin", auth, getAdmins);
router.delete("/:id", auth, deleteUserController);
router.post("/email/subscribe", schemaValidator(subscribeEmailSchema, "body"), newsletterSubscription);
router.get("/search", auth, searchUserController);
module.exports = router;
