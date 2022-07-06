const router = require("express").Router();
const { getPrayers, addPrayer, updatePrayer, deletePrayerController, getPrayerController } = require("../controllers/prayers");

const schemaValidator = require("../middlewares/schemaValidator");
const { addPrayerSchema, editPrayerSchema } = require("../schemas/prayers");

const auth = require("../middlewares/auth");

router.get("/", getPrayers);
router.get("/:id", getPrayerController);
router.post("/", schemaValidator(addPrayerSchema, "body"), auth, addPrayer);
router.put("/:id", schemaValidator(editPrayerSchema, "body"), auth, updatePrayer);
router.delete("/:id", auth, deletePrayerController);
module.exports = router;
