const catchAsync = require("../utils/catchAsync");

module.exports = {
    addSccController: catchAsync(async (req, res) => {
        res.send({
            success: true,
            message: "Scc Added successfully.",
            scc: {},
        });
    }),

    getSccsController: catchAsync(async (req, res) => {
        res.send({ success: true, sccs: [] });
    }),

    getSccController: catchAsync(async (req, res) => {
        res.send({ success: true, scc: {} });
    }),

    updateSccController: catchAsync(async (req, res) => {
        res.send({
            success: true,
            message: "Updated successfully!",
            scc: {},
        });
    }),

    updateSccGalleryController: catchAsync(async (req, res) => {
        res.send({
            success: true,
            message: "Image Added successfully!",
            image: req.body.image,
        });
    }),

    deleteSccController: catchAsync(async (req, res) => {
        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
