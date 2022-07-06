const { sequelize } = require("../models");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    addLeaderController: catchAsync(async (req, res) => {
        const leader = await sequelize.models.leaders.create({
            ...req.body,
            churchCommittee: req.body.churchCommittee ? 1 : 0,
            isActive: req.body.isActive ? 1 : 0,
        });

        res.send({
            success: true,
            message: "Leader Added successfully.",
            leader,
        });
    }),

    getLeadersController: catchAsync(async (req, res) => {
        let leaders = [];

        if (req.query.id) {
            leaders = await sequelize.models.leaders.findAll({
                where: { groupId: req.query.id },
            });
        } else {
            leaders = await sequelize.models.leaders.findAll();
        }

        leaders = await Promise.all(
            leaders.map(async (leader) => {
                const title = await sequelize.models.positions.findByPk(
                    leader.title
                );

                return { ...leader.dataValues, title };
            })
        );

        res.send({ success: true, leaders });
    }),

    getLeaderController: catchAsync(async (req, res) => {
        const { id } = req.params;
        const leader = await sequelize.models.leaders.findByPk(id);

        if (!leader)
            return res
                .status(404)
                .send({ success: false, message: "Leader not found" });

        const title = await sequelize.models.positions.findByPk(leader.title);
        if (title) leader.title = title;

        const scc = await sequelize.models.sccs.findByPk(leader.scc);
        if (scc) leader.scc = scc;

        res.send({ success: true, leader });
    }),

    updateLeaderController: catchAsync(async (req, res) => {
        const { id } = req.params;
        let leader = await sequelize.models.leaders.findByPk(id);

        if (!leader)
            return res
                .status(404)
                .send({ success: false, message: "Leader not found" });

        await sequelize.models.leaders.update(
            {
                ...req.body,
                isActive: req.body.isActive ? 1 : 0,
                churchCommittee: req.body.churchCommittee ? 1 : 0,
            },
            {
                where: { _id: id },
            }
        );

        leader = await sequelize.models.leaders.findByPk(id);

        res.send({
            success: true,
            message: "Updated successfully!",
            leader,
        });
    }),
};
