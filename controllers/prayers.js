const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const Prayer = require("../models/Prayer");

module.exports = {
  getPrayers: catchAsync(async (req, res) => {
    const prayers = await Prayer.find().select("-password");

    res.send({ success: true, prayers });
  }),

  addPrayer: catchAsync(async (req, res) => {
    const prayer = await Prayer.create(req.body);

    await prayer.save({ validateBeforeSave: false });

    res.send({ success: true, prayer, message: "prayer added successfully!" });
  }),
};
