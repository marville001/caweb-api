const catchAsync = require("../utils/catchAsync");

module.exports = {
    addLeaderController: catchAsync(async (req, res) => {
        res.send({
            success: true,
            message: "Leader Added successfully.",
            leader: {},
        });
    }),

    getLeadersController: catchAsync(async (req, res) => {
        res.send({ success: true, leaders: [] });
    }),

    getLeaderController: catchAsync(async (req, res) => {
        res.send({ success: true, leader: [] });
    }),

    updateLeaderController: catchAsync(async (req, res) => {
        res.send({
            success: true,
            message: "Updated successfully!",
            leader: {},
        });
    }),
};
