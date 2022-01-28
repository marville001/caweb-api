const router = require("express").Router();
const { uploadAvatar, getUsers } = require("../controllers/users");

// const schemaValidator = require("../middlewares/schemaValidator");
// const {  } = require("../schemas/users");

const auth = require("../middlewares/auth");

router.get("/", auth, getUsers);
router.put("/upload-avatar/:id", auth, uploadAvatar);
module.exports = router;
