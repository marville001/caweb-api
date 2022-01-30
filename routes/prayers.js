const router = require("express").Router();
const { getPrayers, addPrayer } = require("../controllers/prayers");

const schemaValidator = require("../middlewares/schemaValidator");
const { addPrayerSchema } = require("../schemas/prayers");

const auth = require("../middlewares/auth");

router.post("/", schemaValidator(addPrayerSchema, "body"), auth, addPrayer);
router.get("/", auth, getPrayers);
module.exports = router;
