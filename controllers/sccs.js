const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const Scc = require("../models/Scc");

module.exports = {
    addSccController: catchAsync(async (req, res) => {
        let scc = await Scc.findOne({
            key: req.body.name.replaceAll(" ", "").toLowerCase(),
        });
        if (scc)
            return res
                .status(400)
                .send({ success: false, message: "Scc already exist" });

        if (!req.files || !req.files.image) {
            return res
                .status(400)
                .send({ success: false, message: "No 'image' selected" });
        }

        const id = crypto.randomBytes(16).toString("hex");

        const { image } = req.files;
        const { name, description, category } = req.body;

        const imageLink = `${id + "_" + image.name}`;
        image.mv(`uploads/${imageLink}`);

        scc = await Scc.create({
            name,
            key: name.replaceAll(" ", "").toLowerCase(),
            description,
            image: imageLink,
            gallery: [imageLink],
            category,
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

        if (!scc)
            return res
                .status(404)
                .send({ success: false, message: "Scc not found" });

        res.send({ success: true, scc });
    }),

    updateSccController: catchAsync(async (req, res) => {
        const { id } = req.params;

        let scc = await Scc.findById(id);
        if (!scc)
            return res
                .status(404)
                .send({ success: false, message: "Scc does not exist" });

        scc = await Scc.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...req.body,
                    key: req.body.name.replaceAll(" ", "").toLowerCase(),
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );
        res.send({
            success: true,
            message: "Updated successfully!",
            scc,
        });
    }),

    updateSccGalleryController: catchAsync(async (req, res) => {
        const { id } = req.params;

        let scc = await Scc.findById(id);
        if (!scc)
            return res
                .status(404)
                .send({ success: false, message: "Scc does not exist" });

        if (!req.body.image) {
            return res
                .status(400)
                .send({ success: false, message: "No 'image' selected" });
        }

        const gallery = [req.body.image, ...scc.gallery];

        scc = await Scc.findByIdAndUpdate(
            id,
            {
                $set: {
                    gallery,
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );
        res.send({
            success: true,
            message: "Image Added successfully!",
            image: req.body.image,
        });
    }),
};
