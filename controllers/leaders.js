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
        
        let leaders = [];

        if (req.query.id)
            leaders = await Leader.find({ groupId: req.query.id }).populate("title scc");
        else
            leaders = await Leader.find().populate("title scc");

        res.send({ success: true, leaders });
    }),

    getLeaderController: catchAsync(async (req, res) => {
        const { id } = req.params;
        const leader = await Leader.findById(id).populate("title scc");

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
        ).populate("title scc");
        res.send({
            success: true,
            message: "Updated successfully!",
            leader,
        });
    }),
};
