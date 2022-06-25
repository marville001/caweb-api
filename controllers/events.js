const catchAsync = require("../utils/catchAsync");
const Event = require("../models/Event");
const mongoose = require("mongoose");

module.exports = {
    addEventController: catchAsync(async (req, res) => {
        const {
            title,
            key,
            description,
            group,
            date,
            groupId,
            image,
            location,
        } = req.body;

        const event = await Event.create({
            title,
            key,
            description,
            image,
            location,
            group,
            date,
            groupId,
        });

        await event.save();

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

        const query = {
            skip: pagesize * (page > 0 ? page - 1 : 1),
            limit: pagesize,
        };

        const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
        const searchRgx = rgx(search);

        const allEvents = await Event.find({
            $or: [
                {
                    title: { $regex: searchRgx, $options: "i" },
                },
                {
                    description: { $regex: searchRgx, $options: "i" },
                },
            ],
        });
        const total = allEvents.length;
        const events = await Event.find(
            {
                $or: [
                    {
                        title: { $regex: searchRgx, $options: "i" },
                    },
                    {
                        description: { $regex: searchRgx, $options: "i" },
                    },
                ],
            },
            {},
            query
        );

        res.send({ success: true, events, total });
    }),

    getEventController: catchAsync(async (req, res) => {
        const { key } = req.params;
        let event;

        if (mongoose.Types.ObjectId.isValid(key)) {
            event = await Event.findById(key);
        } else {
            event = await Event.findOne({ key });
        }

        if (!event)
            return res
                .status(404)
                .send({ success: false, message: "Event not found" });

        res.send({ success: true, event });
    }),

    updateEventController: catchAsync(async (req, res) => {
        const { id } = req.params;

        let event = await Event.findById(id);
        if (!event)
            return res
                .status(404)
                .send({ success: false, message: "Event does not exist" });

        event = await Event.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            {
                new: true,
                runValidators: true,
            }
        );
        res.send({
            success: true,
            message: "Updated successfully!",
            event,
        });
    }),

    deleteEventController: catchAsync(async (req, res) => {
        const { id } = req.params;

        const event = await Event.findById(id);
        if (!event)
            return res
                .status(404)
                .send({ success: false, message: "Event does not exist" });

        await Event.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
