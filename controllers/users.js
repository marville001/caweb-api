const { sequelize } = require("../models");
const catchAsync = require("../utils/catchAsync");

const {Op} = require("sequelize");
const _ = require("lodash");

module.exports = {
    uploadAvatar: catchAsync(async (req, res) => {
        const { id } = req.params;

        if (!req.body.avatar) {
            return res
                .status("400")
                .send({ success: false, message: "No avatar selected" });
        }

        const { avatar } = req.body;

        let user = await sequelize.models.users.findByPk(id);

        if (!user)
            return res
                .status(404)
                .send({ success: false, message: "User not found" });

        await sequelize.models.users.update(
            { avatar },
            {
                where: { id },
            }
        );

        user = await sequelize.models.users.findByPk(id);

        res.send({
            success: true,
            message: "Profile picture updated.",
            user: _.pick(user, [
                "id",
                "firstname",
                "lastname",
                "username",
                "email",
                "scc",
                "role",
                "school",
                "avatar",
                "phoneNumber",
            ]),
        });
    }),

    getUsers: catchAsync(async (req, res) => {
        const search = req.query.search || "";
        const pagesize = req.query.pagesize || 10;
        const page = req.query.page || 1;
        const order = req.query.order || "ASC";
        const sortby = req.query.sortby || "id";

        let where = {};

        if (search !== "") {
            where = {
                [Op.or]: [
                    {
                        firstname: {
                            [Op.iLike]: `%${search}%`,
                        },
                    },
                    {
                        lastname: {
                            [Op.iLike]: `%${search}%`,
                        },
                    },
                    {
                        email: {
                            [Op.iLike]: `%${search}%`,
                        },
                    },
                ],
            };
        }

        const limit = pagesize <= 0 ? null : pagesize;
        const offset =
            page <= 0 ? 0 : (page - 1) * (pagesize <= 0 ? 0 : pagesize);

        const total = await sequelize.models.users.count({ where });

        let users = await sequelize.models.users.findAll({
            where,
            limit,
            offset,
            order: [[sortby, order]],
            subQuery: false,
            // include: sequelize.models.users,
        });

        res.send({
            success: true,
            users: _.map(
                users,
                ({
                    id,
                    firstname,
                    lastname,
                    username,
                    email,
                    scc,
                    role,
                    school,
                    avatar,
                    phoneNumber,
                }) => ({
                    id,
                    firstname,
                    lastname,
                    username,
                    email,
                    scc,
                    role,
                    school,
                    avatar,
                    phoneNumber,
                })
            ),
            total,
        });
    }),

    createAdmin: catchAsync(async (req, res) => {
        const { email } = req.body;
        if (!email)
            return res
                .status(400)
                .send({ success: false, message: "email is required" });

        let user = await sequelize.models.users.findOne({ where: { email } });

        if (!user)
            return res
                .status(404)
                .send({ success: false, message: "Email does not exist" });

        await sequelize.models.users.update(
            { role: "admin" },
            {
                where: { id: user.id },
            }
        );

        user = await sequelize.models.users.findByPk(user.id);

        res.send({
            success: true,
            user: _.pick(user, [
                "id",
                "firstname",
                "lastname",
                "username",
                "email",
                "scc",
                "role",
                "school",
                "avatar",
                "phoneNumber",
            ]),
            message: "User updated to admin!",
        });
    }),

    removeAdminController: catchAsync(async (req, res) => {
        const { id } = req.params;
        let user = await sequelize.models.users.findByPk(id);

        if (!user)
            return res
                .status(404)
                .send({ success: false, message: "Account does not exist" });

        await sequelize.models.users.update(
            { role: "user" },
            {
                where: { id },
            }
        );

        user = await sequelize.models.users.findByPk(user.id);

        res.send({
            success: true,
            user: _.pick(user, [
                "id",
                "firstname",
                "lastname",
                "username",
                "email",
                "scc",
                "role",
                "school",
                "avatar",
                "phoneNumber",
            ]),
            message: "User updated to normal user!",
        });
    }),

    getAdmins: catchAsync(async (req, res) => {
        const admins = await sequelize.models.users.findAll({
            where: {
                role: "admin",
            },
        });
        res.send({
            success: true,
            admins: _.map(
                admins,
                ({
                    id,
                    firstname,
                    lastname,
                    username,
                    email,
                    scc,
                    role,
                    school,
                    avatar,
                    phoneNumber,
                }) => ({
                    id,
                    firstname,
                    lastname,
                    username,
                    email,
                    scc,
                    role,
                    school,
                    avatar,
                    phoneNumber,
                })
            ),
        });
    }),

    newsletterSubscription: catchAsync(async (req, res) => {
        const { email } = req.body;

        let newsletterUser = await sequelize.models.newsletters.findOne({
            where: { email },
        });

        if (newsletterUser)
            return res
                .status(400)
                .send({ success: false, message: "Already subscribed" });

        newsletterUser = await sequelize.models.newsletters.create({ email });

        res.send({ success: true, message: "Subscription successfull" });
    }),

    deleteUserController: catchAsync(async (req, res) => {
        const { id } = req.params;
        let user = await sequelize.models.users.findByPk(id);

        if (!user)
            return res
                .status(404)
                .send({ success: false, message: "Account does not exist" });

        if (user.role === "admin")
            return res.status(400).send({
                success: false,
                message: "Please remove user from admin list first",
            });

        await sequelize.models.users.destroy({ where: { id } });

        let newsletterUser = await sequelize.models.newsletters.findOne({
            where: { email },
        });

        if (newsletterUser)
            return res
                .status(400)
                .send({ success: false, message: "Already subscribed" });

        newsletterUser = await sequelize.models.newsletters.create({ email });

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),

    joinSccController: catchAsync(async (req, res) => {
        const { sid, uid } = req.params;

        const scc = await sequelize.models.sccs.findByPk(sid);
        if (!scc)
            return res
                .status(404)
                .send({ success: false, message: "Scc does not exist" });

        const user = await sequelize.models.users.findByPk(uid);
        if (!user)
            return res
                .status(404)
                .send({ success: false, message: "User does not exist" });

        let membership = await sequelize.models.membership.findOne({
            where: { userId: uid, groupId: sid },
        });

        if (membership)
            return res.status(400).send({
                success: false,
                message: "Already a member of the group",
            });

        await sequelize.models.membership.create({ userId: uid, groupId: sid });

        res.status(200).json({
            success: true,
            message: `Joined Group Successfull.`,
        });
    }),
};
