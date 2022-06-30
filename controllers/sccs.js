const { sequelize } = require("../models");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    addSccController: catchAsync(async (req, res) => {
        const { name, key, description, category, image } = req.body;

        let scc = await sequelize.models.sccs.findOne({ where: { key } });

        if (scc)
            return res
                .status(400)
                .send({ success: false, message: "Scc already exist" });

        scc = await sequelize.models.sccs.create({
            name,
            key,
            image,
            description,
            category,
        });

        res.send({
            success: true,
            message: "Scc Added successfully.",
            scc,
        });
    }),

    getSccsController: catchAsync(async (req, res) => {
        const sccs = await sequelize.models.sccs.findAll();
        res.send({ success: true, sccs });
    }),

    getSccController: catchAsync(async (req, res) => {
        const { key } = req.params;
        const scc = await sequelize.models.sccs.findOne({ where: { key } });

        if (!scc)
            return res
                .status(400)
                .send({ success: false, message: "Scc not found" });

        res.send({ success: true, scc });
    }),

    updateSccController: catchAsync(async (req, res) => {
        const { id } = req.params;
        let scc = await sequelize.models.sccs.findByPk(id);

        if (!scc)
            return res
                .status(400)
                .send({ success: false, message: "Scc not found" });

        await sequelize.models.sccs.update(req.body, {
            where: {_id: id},
        });

        scc = await sequelize.models.sccs.findByPk(id);

        res.send({
            success: true,
            message: "Updated successfully!",
            scc,
        });
    }),

    updateSccGalleryController: catchAsync(async (req, res) => {
        const { id } = req.params;
        let scc = await sequelize.models.sccs.findByPk(id);

        if (!scc)
            return res
                .status(400)
                .send({ success: false, message: "Scc not found" });

        await sequelize.models.images.create({
            title: `${scc.name} Gallery`,
            description: `${scc.name} Gallery`,
            date: new Date(),
            image: req.body.image,
            groupId: id,
        });

        res.send({
            success: true,
            message: "Image Added successfully!",
            image: req.body.image,
        });
    }),

    deleteSccController: catchAsync(async (req, res) => {
        const { id } = req.params;
        let scc = await sequelize.models.sccs.findByPk(id);

        if (scc)
            return res
                .status(400)
                .send({ success: false, message: "Scc already exist" });

        await sequelize.models.sccs.destroy({
            where: {_id: id},
        });

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
