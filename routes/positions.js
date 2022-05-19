const router = require("express").Router();

const schemaValidator = require("../middlewares/schemaValidator");

const auth = require("../middlewares/auth");
const { getPositionsController, getPositionController, addPositionController, updatePositionController } = require("../controllers/positions");
const { addPositionSchema, updatePositionSchema } = require("../schemas/positions");

router.get("/",  getPositionsController);
router.get("/:id",  getPositionController);
router.post("/", auth,  schemaValidator(addPositionSchema, "body"), auth, addPositionController);
router.put("/:id",auth,  schemaValidator(updatePositionSchema, "body"), auth, updatePositionController);
module.exports = router;
