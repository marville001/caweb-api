const router = require("express").Router();

const schemaValidator = require("../middlewares/schemaValidator");

const auth = require("../middlewares/auth");
const { addSccSchema } = require("../schemas/sccs");
const { addSccController } = require("../controllers/sccs");

router.post("/", schemaValidator(addSccSchema, "body"), auth, addSccController);
module.exports = router;
