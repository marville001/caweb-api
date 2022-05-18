const mongoose = require("mongoose");

const leaderSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        groupId: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            required: true,
        },
        churchCommittee: {
            type: Boolean,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        createdAt: {
            type: String,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

const Leader = mongoose.model("Leader", leaderSchema);
module.exports = Leader;
