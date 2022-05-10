const mongoose = require("mongoose");

const sccSchema = new mongoose.Schema({
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
    createdAt: {
        type: String,
        default: Date.now(),
    },
    gallery: {
        type: [String],
        default: [],
    },
});

const Scc = mongoose.model("Scc", sccSchema);
module.exports = Scc;
