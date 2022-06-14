const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const Event = require("../models/Event");

module.exports = {
    addEventController: catchAsync(async (req, res) => {
        const { title, description, group, date, groupId, image, location } =
            req.body;

        const event = await Event.create({
            title,
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
        const events = await Event.find();

        res.send({ success: true, events });
    }),

    getEventController: catchAsync(async (req, res) => {
        const { id } = req.params;
        const event = await Event.findById(id);

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
