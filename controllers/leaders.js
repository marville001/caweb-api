const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const Leader = require("../models/Leader");

module.exports = {
    addLeaderController: catchAsync(async (req, res) => {
        const leader = await Leader.create(req.body);

        await leader.save();

        res.send({
            success: true,
            message: "Leader Added successfully.",
            leader,
        });
    }),

    getLeadersController: catchAsync(async (req, res) => {
        const leaders = await Leader.find();

        res.send({ success: true, leaders });
    }),

    getLeaderController: catchAsync(async (req, res) => {
        const { id } = req.params;
        const leader = await Leader.findById(id);

        if (!leader)
            return res
                .status(404)
                .send({ success: false, message: "Leader not found" });

        res.send({ success: true, leader });
    }),

    updateLeaderController: catchAsync(async (req, res) => {
        const { id } = req.params;

        let leader = await Leader.findById(id);
        if (!leader)
            return res
                .status(404)
                .send({ success: false, message: "Leader does not exist" });

        leader = await Leader.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            {
                new: true,
                runValidators: true,
            }
        );
        res.send({
            success: true,
            message: "Updated successfully!",
            leader,
        });
    }),
};
