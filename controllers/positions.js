const { sequelize } = require("../models");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    addPositionController: catchAsync(async (req, res) => {
        const { title } = req.body;

        let position = await sequelize.models.positions.findOne({
            where: { title },
        });


        if (position)
            return res.status(404).send({
                success: false,
                message: "Position with given title exists",
            });

        position = await sequelize.models.positions.create(req.body);
        
        res.send({
            success: true,
            message: "Position Added successfully.",
            position,
        });
    }),

    getPositionsController: catchAsync(async (req, res) => {
        const positions = await sequelize.models.positions.findAll();

        res.send({ success: true, positions });
    }),

    getPositionController: catchAsync(async (req, res) => {
        const { id } = req.params;
        const position = await sequelize.models.positions.findByPk(id);

        if (!position)
            return res
                .status(404)
                .send({ success: false, message: "Position not found" });

        res.send({ success: true, position });
    }),

    updatePositionController: catchAsync(async (req, res) => {
        const { id } = req.params;
        let position = await sequelize.models.positions.findByPk(id);

        if (!position)
            return res
                .status(404)
                .send({ success: false, message: "Position not found" });

        await sequelize.models.positions.update(req.body, {
            where: {_id: id},
        });

        position = await sequelize.models.positions.findByPk(id);

        res.send({
            success: true,
            message: "Updated successfully!",
            position,
        });
    }),
};
