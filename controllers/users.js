const catchAsync = require("../utils/catchAsync");

module.exports = {
    uploadAvatar: catchAsync(async (req, res) => {
        res.send({
            success: true,
            message: "Profile picture updated.",
            user: {},
        });
    }),

    getUsers: catchAsync(async (req, res) => {
        const pagesize = req.query.pagesize || 5;
        const page = req.query.page || 1;

        res.send({ success: true, users: [], total: {} });
    }),

    createAdmin: catchAsync(async (req, res) => {
        res.send({
            success: true,
            user: {},
            message: "User updated to admin!",
        });
    }),

    removeAdminController: catchAsync(async (req, res) => {
        res.send({
            success: true,
            user: {},
            message: "User updated to normal user!",
        });
    }),

    getAdmins: catchAsync(async (req, res) => {
        res.send({ success: true, admins: [] });
    }),

    newsletterSubscription: catchAsync(async (req, res) => {
        res.send({ success: true, message: "Subscription successfull" });
    }),

    deleteUserController: catchAsync(async (req, res) => {
        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),

    searchUserController: catchAsync(async (req, res) => {
        const search = req.query.search || "";

        const pagesize = req.query.pagesize || 5;
        const page = req.query.page || 1;

        res.status(200).json({
            success: true,
            users: [],
            total: 0,
        });
    }),

    joinSccController: catchAsync(async (req, res) => {
        res.status(200).json({
            success: true,
            message: `Joined Group Successfull.`,
        });
    }),
};
