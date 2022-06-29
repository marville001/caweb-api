const catchAsync = require("../utils/catchAsync");

module.exports = {
    uploadImage: catchAsync(async (req, res) => {
        res.send({
            success: true,
            message: "Image updated successfully.",
            image: {},
        });
    }),

    getImages: catchAsync(async (req, res) => {
        const pagesize = req.query.pagesize || 10;
        const page = req.query.page || 1;

        const query = {
            skip: pagesize * (page > 0 ? page - 1 : 1),
            limit: pagesize,
        };

        res.send({ success: true, images: [], total: 0 });
    }),

    deleteImageController: catchAsync(async (req, res) => {
        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
