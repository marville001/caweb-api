const catchAsync = require("../utils/catchAsync");
const { sequelize } = require("../models");

module.exports = {
    createAboutController: catchAsync(async (req, res) => {
        let about = await sequelize.models.about.findAll();

        if (about.length > 0)
            return res
                .status(400)
                .send({ success: false, message: "About already exists" });

        about = await sequelize.models.about.create(req.body);

        res.send({
            success: true,
            message: "About Saved successfully.",
            about,
        });
    }),

    getAboutController: catchAsync(async (req, res) => {
        const about = await sequelize.models.about.findAll();

        if (about.length > 0) res.send({ success: true, about: about[0] });
        else res.send({ success: true, about });
    }),

    updateAboutController: catchAsync(async (req, res) => {
        const { id } = req.params;

        let about = await sequelize.models.about.findByPk(id);

        if (!about)
            return res
                .status(404)
                .send({ success: false, message: "About does not exist" });

        await sequelize.models.about.update(req.body, {
            where: {_id: id},
        });

        about = await sequelize.models.about.findByPk(id);

        res.send({
            success: true,
            message: "Updated successfully!",
            about,
        });
    }),
};
