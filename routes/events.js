const router = require("express").Router();

const schemaValidator = require("../middlewares/schemaValidator");

const auth = require("../middlewares/auth");
const { getEventController, getEventsController, addEventController, updateEventController } = require("../controllers/events");
const { addEventSchema, updateEventSchema } = require("../schemas/events");

router.get("/",  getEventsController);
router.get("/:id",  getEventController);
router.post("/", auth,  schemaValidator(addEventSchema, "body"), auth, addEventController);
router.put("/:id",auth,  schemaValidator(updateEventSchema, "body"), auth, updateEventController);
module.exports = router;
