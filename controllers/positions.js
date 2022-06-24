const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const Position = require("../models/Position");

module.exports = {
    addPositionController: catchAsync(async (req, res) => {
        let position = await Position.findOne({
            title: req.body.title,
        });

        if (position)
            return res
                .status(404)
                .send({
                    success: false,
                    message: "Position with given title exists",
                });
        
        position = await Position.create(req.body);

        await position.save();

        res.send({
            success: true,
            message: "Position Added successfully.",
            position,
        });
    }),

    getPositionsController: catchAsync(async (req, res) => {
        const positions = await Position.find().sort({createdAt: -1});

        res.send({ success: true, positions });
    }),

    getPositionController: catchAsync(async (req, res) => {
        const { id } = req.params;
        const position = await Position.findById(id);

        if (!position)
            return res
                .status(404)
                .send({ success: false, message: "Position not found" });

        res.send({ success: true, position });
    }),

    updatePositionController: catchAsync(async (req, res) => {
        const { id } = req.params;

        let position = await Position.findById(id);
        if (!position)
            return res
                .status(404)
                .send({ success: false, message: "Position does not exist" });

        position = await Position.findByIdAndUpdate(
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
            position,
        });
    }),
};
