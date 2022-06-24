const router = require("express").Router();

const schemaValidator = require("../middlewares/schemaValidator");

const auth = require("../middlewares/auth");
const { getAboutController, createAboutController, updateAboutController } = require("../controllers/about");
const { createAboutSchema, updateAboutSchema } = require("../schemas/about");

router.get("/",  getAboutController);
router.post("/", auth,  schemaValidator(createAboutSchema, "body"), createAboutController);
router.put("/:id",auth,  schemaValidator(updateAboutSchema, "body"), updateAboutController);
module.exports = router;
