const { sequelize } = require("../models");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    addMainLeaderController: catchAsync(async (req, res) => {
        const mainleader = await sequelize.models.mainleaders.create(req.body);

        res.send({
            success: true,
            message: "Leader Added successfully.",
            mainleader,
        });
    }),

    getMainLeadersController: catchAsync(async (req, res) => {
        const mainleaders = await sequelize.models.mainleaders.findAll();
        res.send({ success: true, mainleaders });
    }),

    getMainLeaderController: catchAsync(async (req, res) => {
        const { id } = req.params;
        const mainleader = await sequelize.models.mainleaders.findByPk(id);

        if (!mainleader)
            return res
                .status(404)
                .send({ success: false, message: "Leader not found" });

        res.send({ success: true, mainleader });
    }),

    updateMainLeaderController: catchAsync(async (req, res) => {
        const { id } = req.params;
        let mainleader = await sequelize.models.mainleaders.findByPk(id);

        if (!mainleader)
            return res
                .status(404)
                .send({ success: false, message: "Leader not found" });
        
        await sequelize.models.mainleaders.update(req.body, {
            where: {_id: id},
        });

        mainleader = await sequelize.models.mainleaders.findByPk(id);

        res.send({
            success: true,
            message: "Updated successfully!",
            mainleader,
        });
    }),
};
