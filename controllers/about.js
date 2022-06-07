const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const About = require("../models/About");

module.exports = {
    createAboutController: catchAsync(async (req, res) => {
        let about = await About.find();

        if (about.length > 0)
            return res
                .status(400)
                .send({ success: false, message: "About already exists" });

        about = await About.create(req.body);

        await about.save();

        res.send({
            success: true,
            message: "About Saved successfully.",
            about,
        });
    }),

    getAboutController: catchAsync(async (req, res) => {
        let about = await About.find();

        if (about.length > 0) res.send({ success: true, about: about[0] });
        else res.send({ success: true, about: {} });
    }),

    updateAboutController: catchAsync(async (req, res) => {
        const { id } = req.params;

        let about = await About.findById(id);
        if (!about)
            return res
                .status(404)
                .send({ success: false, message: "About does not exist" });

        about = await About.findByIdAndUpdate(
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
            about,
        });
    }),
};
