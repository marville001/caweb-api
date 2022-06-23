const router = require("express").Router();

const schemaValidator = require("../middlewares/schemaValidator");

const auth = require("../middlewares/auth");
const { getBlogsController, getBlogController, addBlogController, updateBlogController, deleteBlogController } = require("../controllers/blogs");
const { addBlogSchema, updateBlogSchema } = require("../schemas/blogs");

router.get("/",  getBlogsController);
router.get("/:slug",  getBlogController);
router.post("/", auth,  schemaValidator(addBlogSchema, "body"), auth, addBlogController);
router.put("/:id", auth, schemaValidator(updateBlogSchema, "body"), auth, updateBlogController);
router.delete("/:id", auth, deleteBlogController);
module.exports = router;
