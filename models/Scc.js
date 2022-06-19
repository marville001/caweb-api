const mongoose = require("mongoose");

const sccSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            required: true,
        },
        gallery: {
            type: [String],
            default: [],
        },
        members: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: [],
        },
    },
    { timestamps: true }
);

const Scc = mongoose.model("Scc", sccSchema);
module.exports = Scc;
