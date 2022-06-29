const { sequelize } = require("../models");
const catchAsync = require("../utils/catchAsync");
const { Op } = require("sequelize");

module.exports = {
    addEventController: catchAsync(async (req, res) => {
        const event = await sequelize.models.events.create(req.body);

        res.send({
            success: true,
            message: "Event Added successfully.",
            event,
        });
    }),

    getEventsController: catchAsync(async (req, res) => {
        const search = req.query.search || "";
        const pagesize = req.query.pagesize || 10;
        const page = req.query.page || 1;
        const order = req.query.order || "ASC";
        const sortby = req.query.sortby || "id";

        let where = {};

        if (search !== "") {
            where = {
                [Op.or]: [
                    {
                        title: {
                            [Op.iLike]: `%${search}%`,
                        },
                    },
                    {
                        description: {
                            [Op.iLike]: `%${search}%`,
                        },
                    },
                ],
            };
        }

        const limit = pagesize <= 0 ? null : pagesize;
        const offset =
            page <= 0 ? 0 : (page - 1) * (pagesize <= 0 ? 0 : pagesize);

        const total = await sequelize.models.events.count({ where });

        let events = await sequelize.models.events.findAll({
            where,
            limit,
            offset,
            order: [[sortby, order]],
            subQuery: false,
            // include: sequelize.models.users,
        });

        res.send({ success: true, events, total });
    }),

    getEventController: catchAsync(async (req, res) => {
        const { key } = req.params;

        const event = await sequelize.models.events.findOne({ where: { key } });

        if (!event)
            return res
                .status(404)
                .send({ success: false, message: "Event not found" });

        res.send({ success: true, event });
    }),

    updateEventController: catchAsync(async (req, res) => {
        const { id } = req.params;

        let event = await sequelize.models.events.findByPk(id);
        if (!event)
            return res
                .status(404)
                .send({ success: false, message: "Event does not exist" });

        await sequelize.models.events.update(req.body, {
            where: { id },
        });

        event = await sequelize.models.events.findByPk(id);

        res.send({
            success: true,
            message: "Updated successfully!",
            event,
        });
    }),

    deleteEventController: catchAsync(async (req, res) => {
        const { id } = req.params;

        let event = await sequelize.models.events.findByPk(id);
        if (!event)
            return res
                .status(404)
                .send({ success: false, message: "Event does not exist" });

        await sequelize.models.events.destroy({ where: { id } });
        
        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
