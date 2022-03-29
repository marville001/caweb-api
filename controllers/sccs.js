const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const Scc = require("../models/Scc");

module.exports = {
    addSccController: catchAsync(async (req, res) => {
        if (!req.files || !req.files.image) {
            return res
                .status("400")
                .send({ success: false, message: "No 'image' selected" });
        }

        const id = crypto.randomBytes(16).toString("hex");

        const { image } = req.files;
        const { name, description } = req.body;

        const imageLink = `${id + "_" + image.name}`;
        image.mv(`uploads/${imageLink}`);

        const scc = await Scc.create({
            name,
            key: name.replaceAll(" ", "").toLowerCase(),
            description,
            image: imageLink,
        });

        await scc.save();

        res.send({ success: true, message: "Scc Added successfully.", scc });
    }),
    getSccsController: catchAsync(async (req, res) => {
        const sccs = await Scc.find();

        res.send({ success: true, sccs });
    }),
    getSccController: catchAsync(async (req, res) => {
        const { key } = req.params;
        const scc = await Scc.findOne({ key });

        res.send({ success: true, scc });
    }),
};
