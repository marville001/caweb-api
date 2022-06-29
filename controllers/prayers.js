const catchAsync = require("../utils/catchAsync");

module.exports = {
    getPrayers: catchAsync(async (req, res) => {
        res.send({ success: true, prayers: [] });
    }),

    addPrayer: catchAsync(async (req, res) => {
        res.send({
            success: true,
            prayer: {},
            message: "prayer added successfully!",
        });
    }),

    updatePrayer: catchAsync(async (req, res) => {
        res.send({
            success: true,
            prayer: {},
            message: "prayer added successfully!",
        });
    }),

    deletePrayerController: catchAsync(async (req, res) => {
        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
