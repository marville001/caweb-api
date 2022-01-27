const router = require("express").Router();
const { uploadAvatar } = require("../controllers/users");

// const schemaValidator = require("../middlewares/schemaValidator");
// const {  } = require("../schemas/users");

const auth = require("../middlewares/auth");

router.put("/upload-avatar/:id",  auth, uploadAvatar);
module.exports = router;
