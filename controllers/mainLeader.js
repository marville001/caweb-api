const catchAsync = require("../utils/catchAsync");

module.exports = {
    addMainLeaderController: catchAsync(async (req, res) => {
        res.send({
            success: true,
            message: "Leader Added successfully.",
            mainleader: {},
        });
    }),

    getMainLeadersController: catchAsync(async (req, res) => {
        res.send({ success: true, mainleaders: [] });
    }),

    getMainLeaderController: catchAsync(async (req, res) => {
        res.send({ success: true, mainleader: {} });
    }),

    updateMainLeaderController: catchAsync(async (req, res) => {
        res.send({
            success: true,
            message: "Updated successfully!",
            mainleader: {},
        });
    }),
};
