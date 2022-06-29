const catchAsync = require("../utils/catchAsync");

module.exports = {
    addPositionController: catchAsync(async (req, res) => {
        res.send({
            success: true,
            message: "Position Added successfully.",
            position: {},
        });
    }),

    getPositionsController: catchAsync(async (req, res) => {
        res.send({ success: true, positions: [] });
    }),

    getPositionController: catchAsync(async (req, res) => {
        res.send({ success: true, position: {} });
    }),

    updatePositionController: catchAsync(async (req, res) => {
        res.send({
            success: true,
            message: "Updated successfully!",
            position: {},
        });
    }),
};
