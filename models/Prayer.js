const mongoose = require("mongoose");

const prayerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        prayer: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Prayer = mongoose.model("Prayer", prayerSchema);
module.exports = Prayer;
