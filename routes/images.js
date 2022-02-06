const router = require("express").Router();
const { uploadImage, getImages } = require("../controllers/images");

const schemaValidator = require("../middlewares/schemaValidator");
const { uploadImageSchema } = require("../schemas/image");

const auth = require("../middlewares/auth");

router.post("/", auth, schemaValidator(uploadImageSchema, "body"), uploadImage);
router.get("/",  getImages);
module.exports = router;
