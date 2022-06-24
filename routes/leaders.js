const router = require("express").Router();

const schemaValidator = require("../middlewares/schemaValidator");

const auth = require("../middlewares/auth");
const { getLeadersController, getLeaderController, addLeaderController, updateLeaderController } = require("../controllers/leaders");
const { addLeaderSchema, updateLeaderSchema } = require("../schemas/leaders");

router.get("/",  getLeadersController);
router.get("/:id",  getLeaderController);
router.post("/", auth,  schemaValidator(addLeaderSchema, "body"), addLeaderController);
router.put("/:id",auth,  schemaValidator(updateLeaderSchema, "body"), updateLeaderController);
module.exports = router;
