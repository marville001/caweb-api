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
            default: "",
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
            default: true,
        },
        image: {
            type: String,
            required: true,
        },
        period: {
            type: String,
            required: true,
            default: "",
        },
    },
    { timestamps: true }
);

const Leader = mongoose.model("Leader", leaderSchema);
module.exports = Leader;
