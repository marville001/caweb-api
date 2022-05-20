const mongoose = require("mongoose");

const leaderSchema = new mongoose.Schema(
    {
        title: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Position",
        },
        scc: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Scc",
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
        isActive: {
            type: Boolean,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        period: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Leader = mongoose.model("Leader", leaderSchema);
module.exports = Leader;
