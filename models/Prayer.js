const mongoose = require("mongoose");

const prayerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  prayer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const Prayer = mongoose.model("Prayer", prayerSchema);
module.exports = Prayer;
