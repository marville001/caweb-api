const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
module.exports = {
  uploadAvatar: catchAsync(async (req, res) => {
    if (!req.files || !req.files.avatar) {
      return res
        .status("400")
        .send({ success: false, message: "No 'avatar' selected" });
    }

    const id = crypto.randomBytes(16).toString("hex");

    const { avatar } = req.files;

    const avatarLink = `${id + avatar.name}`;
    avatar.mv(`uploads/${avatarLink}`);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          avatar: avatarLink,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send({ success: true, message: "Profile picture updated.", user });
  }),
  getUsers: catchAsync(async (req, res) => {
    const pagesize = req.query.pagesize || 5;
    const page = req.query.page || 1;

    const query = {
      skip: pagesize * (page > 0 ? page - 1 : 1),
      limit: pagesize,
    };

    const allUsers = await User.find();
    const total = allUsers.length;

    const users = await User.find({}, {}, query).select("-password");

    res.send({ success: true, users, total });
  }),
};
