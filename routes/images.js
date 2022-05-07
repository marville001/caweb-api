const router = require("express").Router();
const { uploadImage, getImages, deleteImageController } = require("../controllers/images");

const schemaValidator = require("../middlewares/schemaValidator");
const { uploadImageSchema } = require("../schemas/image");

const auth = require("../middlewares/auth");

router.post("/", auth, schemaValidator(uploadImageSchema, "body"), uploadImage);
router.get("/",  getImages);
router.delete("/:id",  deleteImageController);
module.exports = router;
