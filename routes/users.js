const router = require("express").Router();
const { uploadAvatar, getUsers, createAdmin, getAdmins } = require("../controllers/users");

// const schemaValidator = require("../middlewares/schemaValidator");
// const {  } = require("../schemas/users");

const auth = require("../middlewares/auth");

router.get("/", auth, getUsers);
router.put("/upload-avatar/:id", auth, uploadAvatar);
router.post("/admin", auth, createAdmin);
router.get("/admin", auth, getAdmins);
module.exports = router;
