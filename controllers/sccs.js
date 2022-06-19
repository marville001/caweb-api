const catchAsync = require("../utils/catchAsync");
const Scc = require("../models/Scc");

module.exports = {
    addSccController: catchAsync(async (req, res) => {
        const { name, key, description, category, image } = req.body;

        let scc = await Scc.findOne({
            key,
        });

        if (scc)
            return res
                .status(400)
                .send({ success: false, message: "Scc already exist" });

        scc = await Scc.create({
            name,
            key,
            description,
            image,
            gallery: [image],
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

    deleteSccController: catchAsync(async (req, res) => {
        const { id } = req.params;

        const scc = await Scc.findById(id);
        if (!scc)
            return res
                .status(404)
                .send({ success: false, message: "Scc does not exist" });

        await Scc.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
