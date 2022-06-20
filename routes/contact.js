const router = require("express").Router();

const schemaValidator = require("../middlewares/schemaValidator");
const { contactSchema } = require("../schemas/contact");
const { contactController } = require("../controllers/contact");

router.post("/", schemaValidator(contactSchema, "body"), contactController);
module.exports = router;
