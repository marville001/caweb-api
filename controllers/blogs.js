const catchAsync = require("../utils/catchAsync");
const { sequelize } = require("../models");
const { Op } = require("sequelize");

module.exports = {
    addBlogController: catchAsync(async (req, res) => {
        const blog = await sequelize.models.blogs.create(req.body);
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
        const order = req.query.order || "ASC";
        const sortby = req.query.sortby || "id";

        let where = {};

        if (search !== "") {
            where = {
                [Op.or]: [
                    {
                        title: {
                            [Op.iLike]: `%${search}%`,
                        },
                    },
                    {
                        blog: {
                            [Op.iLike]: `%${search}%`,
                        },
                    },
                ],
            };
        }

        const limit = pagesize <= 0 ? null : pagesize;
        const offset =
            page <= 0 ? 0 : (page - 1) * (pagesize <= 0 ? 0 : pagesize);

        const total = await sequelize.models.blogs.count();

        let blogs = await sequelize.models.blogs.findAll({
            where,
            limit,
            offset,
            order: [[sortby, order]],
            subQuery: false,
            // include: sequelize.models.users,
        });

        res.send({ success: true, blogs, total });
    }),

    getBlogController: catchAsync(async (req, res) => {
        const { slug } = req.params;

        const blog = await sequelize.models.blogs.findOne({
            where: { slug },
            // include: sequelize.models.users,
        });

        if (!blog)
            return res
                .status(404)
                .send({ success: false, message: "Blog not found" });

        res.send({ success: true, blog });
    }),

    updateBlogController: catchAsync(async (req, res) => {
        const { id } = req.params;

        let blog = await sequelize.models.blogs.findByPk(id);

        if (!blog)
            return res
                .status(404)
                .send({ success: false, message: "Blog does not exist" });

        await sequelize.models.blogs.update(req.body, {
            where: { id },
        });

        blog = await sequelize.models.blogs.findByPk(id);

        res.send({
            success: true,
            message: "Updated successfully!",
            blog,
        });
    }),

    deleteBlogController: catchAsync(async (req, res) => {
        const { id } = req.params;

        let blog = await sequelize.models.blogs.findByPk(id);

        if (!blog)
            return res
                .status(404)
                .send({ success: false, message: "Blog does not exist" });

        await sequelize.models.blogs.destroy({
            where: { id },
        });

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
