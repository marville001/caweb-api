const mongoose = require("mongoose");

const mainLeaderSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const MainLeader = mongoose.model("MainLeader", mainLeaderSchema);
module.exports = MainLeader;
