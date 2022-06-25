const catchAsync = require("../utils/catchAsync");
const Blog = require("../models/Blog");

module.exports = {
    addBlogController: catchAsync(async (req, res) => {
        const blog = await Blog.create(req.body);

        await blog.save();

        res.send({
            success: true,
            message: "Blog Added successfully.",
            blog,
        });
    }),

    getBlogsController: catchAsync(async (req, res) => {
        const search = req.query.search || "";
        const pagesize = req.query.pagesize || 10;
        const page = req.query.page || 1;

        const query = {
            skip: pagesize * (page > 0 ? page - 1 : 1),
            limit: pagesize,
        };

        const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
        const searchRgx = rgx(search);

        const allBlogs = await Blog.find({
            $or: [
                {
                    title: { $regex: searchRgx, $options: "i" },
                },
                {
                    blog: { $regex: searchRgx, $options: "i" },
                },
            ],
        });
        const total = allBlogs.length;
        const blogs = await Blog.find(
            {
                $or: [
                    {
                        title: { $regex: searchRgx, $options: "i" },
                    },
                    {
                        blog: { $regex: searchRgx, $options: "i" },
                    },
                ],
            },
            {},
            query
        ).populate("comments author");

        res.send({ success: true, blogs, total });
    }),

    getBlogController: catchAsync(async (req, res) => {
        const { slug } = req.params;
        const blog = await Blog.findOne({slug}).populate("comments author");

        if (!blog)
            return res
                .status(404)
                .send({ success: false, message: "Blog not found" });

        res.send({ success: true, blog });
    }),

    updateBlogController: catchAsync(async (req, res) => {
        const { id } = req.params;

        let blog = await Blog.findById(id);
        if (!blog)
            return res
                .status(404)
                .send({ success: false, message: "Blog does not exist" });

        blog = await Blog.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            {
                new: true,
                runValidators: true,
            }
        ).populate("comments author");
        res.send({
            success: true,
            message: "Updated successfully!",
            blog,
        });
    }),

    deleteBlogController: catchAsync(async (req, res) => {
        const { id } = req.params;

        const blog = await Blog.findById(id);
        if (!blog)
            return res
                .status(404)
                .send({ success: false, message: "Blog does not exist" });

        await Blog.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
