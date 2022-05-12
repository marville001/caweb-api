const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const Event = require("../models/Event");

module.exports = {
    addEventController: catchAsync(async (req, res) => {

        if (!req.files || !req.files.image) {
            return res
                .status(400)
                .send({ success: false, message: "No 'image' selected" });
        }

        const id = crypto.randomBytes(16).toString("hex");

        const { image } = req.files;
        const { title, description, group, date } = req.body;

        const imageLink = `${id + "_" + image.name}`;
        image.mv(`uploads/${imageLink}`);

        const event = await Event.create({
            title,
            description,
            image: imageLink,
            group, date
        });

        await event.save();

        res.send({ success: true, message: "Event Added successfully.", event });
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
                .send({ success: false, message: "Scc does not exist" });

        let imageLink = "";
        if (req.files && req.files.image) {
            const id = crypto.randomBytes(16).toString("hex");

            const { image } = req.files;
            imageLink = `${id + "_" + image.name}`;
            image.mv(`uploads/${imageLink}`);

            req.body.image = imageLink;
        }

        event = await Event.findByIdAndUpdate(
            id,
            {
                $set:req.body,
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
};
