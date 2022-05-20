const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const Image = require("../models/Image");

module.exports = {
    uploadImage: catchAsync(async (req, res) => {
        const { title, date, description, image } = req.body;

        const uploadImage = await Image.create({
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
        const pagesize = req.query.pagesize || 10;
        const page = req.query.page || 1;

        const query = {
            skip: pagesize * (page > 0 ? page - 1 : 1),
            limit: pagesize,
        };

        const allImages = await Image.find();
        const total = allImages.length;

        const images = await Image.find({}, {}, query).select("-__v");

        res.send({ success: true, images, total });
    }),

    deleteImageController: catchAsync(async (req, res) => {
        const { id } = req.params;

        const image = await Image.findById(id);
        if (!image)
            return res
                .status(404)
                .send({ success: false, message: "Image not found" });

        await Image.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
