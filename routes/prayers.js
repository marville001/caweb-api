const router = require("express").Router();
const { getPrayers, addPrayer, updatePrayer, deletePrayerController } = require("../controllers/prayers");

const schemaValidator = require("../middlewares/schemaValidator");
const { addPrayerSchema, editPrayerSchema } = require("../schemas/prayers");

const auth = require("../middlewares/auth");

router.get("/", getPrayers);
router.post("/", schemaValidator(addPrayerSchema, "body"), auth, addPrayer);
router.put("/", schemaValidator(editPrayerSchema, "body"), auth, updatePrayer);
router.delete("/:id", auth, deletePrayerController);
module.exports = router;
