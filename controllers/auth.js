const bcrypt = require("bcryptjs");
const _ = require("lodash");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { sequelize } = require("../models");
const signToken = require("../utils/signToken");
const { Op } = require("sequelize");

module.exports = {
    getUserDetails: catchAsync(async (req, res) => {
        const { email } = req.user;

        const user = await sequelize.models.users.findOne({
            where: { email },
            include: [
                {
                    model: sequelize.models.membership,
                },
            ],
        });

        const token = signToken({
            id: user._id,
            email: user.email,
            role: user.role,
        });

        const scc = await sequelize.models.sccs.findByPk(user.scc);

        user.scc = scc;

        res.status(200).json({
            success: true,
            message: `Login Successfull.`,
            user: _.pick(user, [
                "_id",
                "firstname",
                "lastname",
                "username",
                "email",
                "scc",
                "role",
                "school",
                "avatar",
                "phoneNumber",
                "memberships",
            ]),
            token,
        });
    }),

    loginController: catchAsync(async (req, res) => {
        const { email, password } = req.body;

        const user = await sequelize.models.users.findOne({
            where: { email },
            include: [
                {
                    model: sequelize.models.membership,
                },
            ],
        });

        if (!user)
            return res
                .status(400)
                .send({ success: false, message: "invalid email or password" });

        let validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(400).send({
                success: false,
                message: "Invalid email or password...",
            });

        const token = signToken({
            id: user._id,
            email: user.email,
            role: user.role,
        });

        const scc = await sequelize.models.sccs.findByPk(user.scc);

        user.scc = scc;

        res.status(200).json({
            success: true,
            message: `Login Successfull.`,
            user: _.pick(user, [
                "_id",
                "firstname",
                "lastname",
                "username",
                "email",
                "scc",
                "role",
                "school",
                "avatar",
                "phoneNumber",
                "memberships",
            ]),
            token,
        });
    }),

    adminLoginController: catchAsync(async (req, res) => {
        const { email, password } = req.body;
        const user = await sequelize.models.users.findOne({
            where: { email },
            include: [
                {
                    model: sequelize.models.membership,
                },
            ],
        });

        if (!user)
            return res
                .status(400)
                .send({ success: false, message: "invalid email or password" });

        let validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(400).send({
                success: false,
                message: "Invalid email or password...",
            });

        if (user.role !== "admin")
            return res
                .status(403)
                .send({ success: false, message: "Access to the side denied" });

        const token = signToken({
            id: user._id,
            email: user.email,
            role: user.role,
        });

        const scc = await sequelize.models.sccs.findByPk(user.scc);

        user.scc = scc;

        res.status(200).json({
            success: true,
            message: `Login Successfull.`,
            user: _.pick(user, [
                "_id",
                "firstname",
                "lastname",
                "username",
                "email",
                "scc",
                "role",
                "school",
                "avatar",
                "phoneNumber",
                "memberships",
            ]),
            token,
        });
    }),

    registerController: catchAsync(async (req, res) => {
        const { firstname, lastname, email, username, scc, password } =
            req.body;

        let user = await sequelize.models.users.findOne({ where: { email } });

        if (user)
            return res
                .status(400)
                .send({ success: false, message: "email already registered" });

        const scc_ = await sequelize.models.sccs.findByPk(scc);
        if (!scc_)
            return res
                .status(404)
                .send({ success: false, message: "Scc does not exist" });

        user = await sequelize.models.users.findOne({ where: { username } });

        if (user)
            return res
                .status(400)
                .send({ success: false, message: "username taken" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await sequelize.models.users.create({
            firstname,
            lastname,
            email,
            username,
            scc,
            password: hashedPassword,
        });

        await sequelize.models.membership.create({
            userId: user._id,
            groupId: scc,
        });

        const token = signToken({
            id: user._id,
            email: user.email,
            role: user.role,
        });

        // Send email to created user
        await sendEmail({
            to: email,
            from: `Dekut Catholic Chaplaincy <${process.env.FROM_EMAIL}>`,
            subject: "Account Created Successfully",
            html: `
            <h2>Hello <strong> ${user.firstname}</strong></h2>
            </br>
            <p>Thank you for creating an account with Dekut Catholic Chaplaincy. </p>`,
        });

        user = await sequelize.models.users.findOne({
            where: { email: user.email },
            include: [
                {
                    model: sequelize.models.membership,
                },
            ],
        });

        user.scc = scc_;

        res.status(200).json({
            success: true,
            message: `Registration Successfull.`,
            user: _.pick(user, [
                "_id",
                "firstname",
                "lastname",
                "username",
                "email",
                "scc",
                "role",
                "school",
                "avatar",
                "phoneNumber",
                "memberships",
            ]),
            token,
        });
    }),

    updatePasswordController: catchAsync(async (req, res) => {
        const { id, old_password, new_password } = req.body;

        let user = await sequelize.models.users.findByPk(id);

        if (!user)
            return res
                .status(400)
                .send({ success: false, message: "Invalid User ID" });

        let validPassword = await bcrypt.compare(old_password, user.password);
        if (!validPassword)
            return res.status(400).send({
                success: false,
                message: "Wrong password...",
            });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);

        await sequelize.models.users.update(
            { password: hashedPassword },
            {
                where: { _id: id },
            }
        );

        res.status(200).json({
            success: true,
            message: `Password Updates Successfully.`,
        });
    }),

    forgotPasswordController: catchAsync(async (req, res) => {
        const { email } = req.body;
        if (!email)
            return res
                .status(400)
                .send({ success: false, message: "Please provide your email" });

        const user = await sequelize.models.users.findOne({ where: { email } });

        if (!user)
            return res
                .status(400)
                .send({ success: false, message: "invalid email..." });

        const resetToken = crypto.randomBytes(32).toString("hex");
        const passwordResetToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        const passwordResetExpires = Date.now() + 10 * 60 * 1000;

        await sequelize.models.users.update(
            { passwordResetToken, passwordResetExpires },
            {
                where: { id: user._id },
            }
        );

        const resetURL = `${process.env.APP_URL}reset-password/${resetToken}`;

        // Send email to create passowrd
        await sendEmail({
            to: email,
            from: `Dekut Catholic Chaplaincy <${process.env.FROM_EMAIL}>`,
            subject: "Your Password reset link. (will expire in 20 minutes)",
            html: `
            <h2>Hello <strong> ${user.firstname}</strong></h2>
            </br>
            <a href="${resetURL}">Click here to reset your password</a>
            `,
        });

        res.status(200).json({
            success: true,
            message: `Forget password link successfully sent to your email`,
        });
    }),

    resetPasswordController: catchAsync(async (req, res) => {
        const hashedToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        // 1 Find the  user based on Token
        const user = await sequelize.models.users.findOne({
            where: {
                passwordResetToken: hashedToken,
                passwordResetExpires: {
                    [Op.gt]: Date.now(),
                },
            },
        });

        console.log("Here");

        if (!user)
            return res.status(400).send({
                success: false,
                message: "Reset Password Link Invalid or Expired !",
            });

        const { password } = req.body;

        if (!password)
            return res.status(400).send({
                success: false,
                message: "Please provide your password",
            });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await sequelize.models.users.update(
            {
                passwordResetToken: "",
                password: hashedPassword,
            },
            {
                where: { id: user._id },
            }
        );

        res.status(200).json({
            success: true,
            message: "Password Reset Successfully",
        });
    }),
};
