const router = require("express").Router();

const schemaValidator = require("../middlewares/schemaValidator");

const auth = require("../middlewares/auth");
const { getMainLeadersController, getMainLeaderController, addMainLeaderController, updateMainLeaderController } = require("../controllers/mainLeader");
const { addMainLeaderSchema, updateMainLeaderSchema } = require("../schemas/mainLeader");

router.get("/",  getMainLeadersController);
router.get("/:id",  getMainLeaderController);
router.post("/", auth,  schemaValidator(addMainLeaderSchema, "body"), addMainLeaderController);
router.put("/:id",auth,  schemaValidator(updateMainLeaderSchema, "body"), updateMainLeaderController);
module.exports = router;
