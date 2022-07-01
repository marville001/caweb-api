const { sequelize } = require("../models");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    uploadImage: catchAsync(async (req, res) => {
        const { title, date, description, image } = req.body;

        const uploadImage = await sequelize.models.images.create({
            title,
            description,
            date: new Date(date),
            image,
        });

        res.send({
            success: true,
            message: "Image updated successfully.",
            image: uploadImage,
        });
    }),

    getImages: catchAsync(async (req, res) => {
        const search = req.query.search || "";
        const pagesize = req.query.pagesize || 10;
        const page = req.query.page || 1;
        const order = req.query.order || "ASC";
        const sortby = req.query.sortby || "_id";

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
                        description: {
                            [Op.iLike]: `%${search}%`,
                        },
                    },
                ],
            };
        }

        const limit = pagesize <= 0 ? null : pagesize;
        const offset =
            page <= 0 ? 0 : (page - 1) * (pagesize <= 0 ? 0 : pagesize);

        const total = await sequelize.models.images.count({ where });

        let images = await sequelize.models.images.findAll({
            where,
            limit,
            offset,
            order: [[sortby, order]],
            subQuery: false,
            // include: sequelize.models.users,
        });

        res.send({ success: true, images, total });
    }),

    deleteImageController: catchAsync(async (req, res) => {
        const { id } = req.params;

        let image = await sequelize.models.images.findByPk(id);
        if (!image)
            return res
                .status(404)
                .send({ success: false, message: "Image does not exist" });

        await sequelize.models.images.destroy({ where: {_id: id} });

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
