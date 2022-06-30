const { sequelize } = require("../models");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    getPrayers: catchAsync(async (req, res) => {
        const prayers = await sequelize.models.prayers.findAll();
        res.send({ success: true, prayers });
    }),

    addPrayer: catchAsync(async (req, res) => {
        const prayer = await sequelize.models.prayers.create(req.body);

        res.send({
            success: true,
            prayer,
            message: "prayer added successfully!",
        });
    }),

    updatePrayer: catchAsync(async (req, res) => {
        const { id } = req.params;
        let prayer = await sequelize.models.prayers.findByPk(id);

        if (!prayer)
            return res
                .status(404)
                .send({ success: false, message: "Prayer not found" });

        await sequelize.models.prayers.update(req.body, {
            where: { id },
        });

        prayer = await sequelize.models.prayers.findByPk(id);

        res.send({
            success: true,
            prayer,
            message: "prayer added successfully!",
        });
    }),

    deletePrayerController: catchAsync(async (req, res) => {
        const { id } = req.params;
        let prayer = await sequelize.models.prayers.findByPk(id);

        if (!prayer)
            return res
                .status(404)
                .send({ success: false, message: "Prayer not found" });

        await sequelize.models.prayers.destroy({
            where: { id },
        });

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
