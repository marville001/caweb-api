const catchAsync = require("../utils/catchAsync");

module.exports = {
    addEventController: catchAsync(async (req, res) => {
        res.send({
            success: true,
            message: "Event Added successfully.",
            event: {},
        });
    }),

    getEventsController: catchAsync(async (req, res) => {
        const search = req.query.search || "";
        const pagesize = req.query.pagesize || 10;
        const page = req.query.page || 1;

        res.send({ success: true, events: [], total: 0 });
    }),

    getEventController: catchAsync(async (req, res) => {
        res.send({ success: true, event: {} });
    }),

    updateEventController: catchAsync(async (req, res) => {
        res.send({
            success: true,
            message: "Updated successfully!",
            event: {},
        });
    }),

    deleteEventController: catchAsync(async (req, res) => {
        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
