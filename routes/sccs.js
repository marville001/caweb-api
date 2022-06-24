const router = require("express").Router();

const schemaValidator = require("../middlewares/schemaValidator");

const auth = require("../middlewares/auth");
const { addSccSchema, updateSccSchema } = require("../schemas/sccs");
const { addSccController, getSccsController, getSccController, updateSccController, updateSccGalleryController, deleteSccController } = require("../controllers/sccs");

router.get("/",  getSccsController);
router.get("/:key",  getSccController);
router.post("/", auth, schemaValidator(addSccSchema, "body"), addSccController);
router.put("/:id", auth, schemaValidator(updateSccSchema, "body"), updateSccController);
router.put("/gallery/:id", auth, updateSccGalleryController);
router.delete("/:id", auth, deleteSccController);
module.exports = router;
