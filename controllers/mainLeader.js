const catchAsync = require("../utils/catchAsync");
const MainLeader = require("../models/MainLeader");

module.exports = {
    addMainLeaderController: catchAsync(async (req, res) => {
        const mainleader = await MainLeader.create(req.body);

        await mainleader.save();

        res.send({
            success: true,
            message: "Leader Added successfully.",
            mainleader,
        });
    }),

    getMainLeadersController: catchAsync(async (req, res) => {
        let mainleaders = await MainLeader.find();

        res.send({ success: true, mainleaders });
    }),

    getMainLeaderController: catchAsync(async (req, res) => {
        const { id } = req.params;
        const mainleader = await MainLeader.findById(id);

        if (!mainleader)
            return res
                .status(404)
                .send({ success: false, message: "Leader not found" });

        res.send({ success: true, mainleader });
    }),

    updateMainLeaderController: catchAsync(async (req, res) => {
        const { id } = req.params;

        let mainleader = await MainLeader.findById(id);
        if (!mainleader)
            return res
                .status(404)
                .send({ success: false, message: "Leader does not exist" });

        mainleader = await MainLeader.findByIdAndUpdate(
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
            mainleader,
        });
    }),
};
