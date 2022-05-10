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

  updatePrayer: catchAsync(async (req, res) => {
    const { _id, title, prayer } = req.body;
    const _prayer = await Prayer.findByIdAndUpdate(
      _id,
      {
        $set: {
          title,
          prayer,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send({
      success: true,
      prayer: _prayer,
      message: "prayer added successfully!",
    });
  }),

  deletePrayerController: catchAsync(async (req, res) => {
        const { id } = req.params;

        const prayer = await Prayer.findById(id);
        if (!prayer)
            return res
                .status(404)
                .send({ success: false, message: "Prayer does not exist" });

        await Prayer.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
