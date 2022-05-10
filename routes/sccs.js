const router = require("express").Router();

const schemaValidator = require("../middlewares/schemaValidator");

const auth = require("../middlewares/auth");
const { addSccSchema, updateSccSchema } = require("../schemas/sccs");
const { addSccController, getSccsController, getSccController, updateSccController } = require("../controllers/sccs");

router.get("/",  getSccsController);
router.get("/:key",  getSccController);
router.post("/", schemaValidator(addSccSchema, "body"), auth, addSccController);
router.put("/:id", schemaValidator(updateSccSchema, "body"), auth, updateSccController);
module.exports = router;
