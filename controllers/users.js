const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const Scc = require("../models/Scc");
const Newsletter = require("../models/Newsletter");

module.exports = {
    uploadAvatar: catchAsync(async (req, res) => {
        if (!req.body.avatar) {
            return res
                .status("400")
                .send({ success: false, message: "No avatar selected" });
        }


        const { avatar } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    avatar,
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

        const users = await User.find({}, {}, query)
            .sort([["createdAt", -1]])
            .select("-password");

        res.send({ success: true, users, total });
    }),

    createAdmin: catchAsync(async (req, res) => {
        const { email } = req.body;
        if (!email)
            return res
                .status(400)
                .send({ success: false, message: "email is required" });

        let user = await User.findOne({ email }).select("+password"); // select expiclity password

        if (!user)
            return res
                .status(404)
                .send({ success: false, message: "Email does not exist" });

        user = await User.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    role: "admin",
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.send({ success: true, user, message: "User updated to admin!" });
    }),

    removeAdminController: catchAsync(async (req, res) => {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user)
            return res
                .status(404)
                .send({ success: false, message: "Account does not exist" });

        await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    role: "user",
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.send({
            success: true,
            user,
            message: "User updated to normal user!",
        });
    }),

    getAdmins: catchAsync(async (req, res) => {
        const admins = await User.find({ role: "admin" })
            .sort([["createdAt", -1]])
            .select("-password");

        res.send({ success: true, admins });
    }),

    newsletterSubscription: catchAsync(async (req, res) => {
        const { email } = req.body;
        let newsletterUser = await Newsletter.findOne({ email });

        if (newsletterUser)
            return res
                .status(400)
                .send({ success: false, message: "Already subscribed" });

        newsletterUser = await Newsletter.create({ email });
        newsletterUser.save({ validateBeforeSave: false });

        res.send({ success: true, message: "Subscription successfull" });
    }),

    deleteUserController: catchAsync(async (req, res) => {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user)
            return res
                .status(404)
                .send({ success: false, message: "Account does not exist" });

        if (user.role === "admin")
            return res.status(400).send({
                success: false,
                message: "Please remove user from admin list first",
            });

        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),

    searchUserController: catchAsync(async (req, res) => {
        const search = req.query.search || "";

        const pagesize = req.query.pagesize || 5;
        const page = req.query.page || 1;

        const query = {
            skip: pagesize * (page > 0 ? page - 1 : 1),
            limit: pagesize,
        };

        if (search === "")
            return res.status(200).json({
                success: true,
                message: `Successfull.`,
                results: [],
            });

        const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
        const searchRgx = rgx(search);

        const users = await User.find(
            {
                $or: [
                    {
                        firstname: { $regex: searchRgx, $options: "i" },
                    },
                    {
                        lastname: { $regex: searchRgx, $options: "i" },
                    },
                    {
                        email: { $regex: searchRgx, $options: "i" },
                    },
                ],
            },
            {},
            query
        )
            .sort([["createdAt", -1]])
            .select("-password");

        const allUsers = await User.find({
            $or: [
                {
                    firstname: { $regex: searchRgx, $options: "i" },
                },
                {
                    lastname: { $regex: searchRgx, $options: "i" },
                },
                {
                    email: { $regex: searchRgx, $options: "i" },
                },
            ],
        });
        const total = allUsers.length;

        res.status(200).json({
            success: true,
            users,
            total,
        });
    }),

    joinSccController: catchAsync(async (req, res) => {
        const { sid, uid } = req.params;

        const scc = await Scc.findById(sid);
        if (!scc)
            return res
                .status(404)
                .send({ success: false, message: "Scc does not exist" });

        const user = await User.findById(uid);
        if (!user)
            return res
                .status(404)
                .send({ success: false, message: "User does not exist" });

        await Scc.findByIdAndUpdate(
            sid,
            {
                $set: {
                    members: [uid, ...scc.members],
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );

        await User.findByIdAndUpdate(
            uid,
            {
                $set: {
                    groups: [uid, ...user.groups],
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: `Joined Group Successfull.`,
        });
    }),
};
