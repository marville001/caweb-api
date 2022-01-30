const router = require("express").Router();
const { getPrayers, addPrayer, updatePrayer } = require("../controllers/prayers");

const schemaValidator = require("../middlewares/schemaValidator");
const { addPrayerSchema, editPrayerSchema } = require("../schemas/prayers");

const auth = require("../middlewares/auth");

router.get("/", auth, getPrayers);
router.post("/", schemaValidator(addPrayerSchema, "body"), auth, addPrayer);
router.put("/", schemaValidator(editPrayerSchema, "body"), auth, updatePrayer);
module.exports = router;
