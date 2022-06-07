const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
    {
        mission: {
            type: String,
            required: true,
        },
        story: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);
module.exports = About;
