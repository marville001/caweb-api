const User = require("../models/User");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

module.exports = {
    getUserDetails: catchAsync(async (req, res) => {
        const { email } = req.user;
        const user = await User.findOne({ email })
            .select("+password")
            .populate("scc"); // select expiclity password

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
                "department",
                "avatar",
                "groups",
            ]),
            token: user.generateAuthToken(),
        });
    }),

    loginController: catchAsync(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
            .select("+password")
            .populate("scc"); // select expiclity password

        if (!user)
            return res
                .status(400)
                .send({ success: false, message: "invalid email or password" });

        let validPassword = await user.correctPassword(password, user.password);
        if (!validPassword)
            return res.status(400).send({
                success: false,
                message: "Invalid email or password...",
            });

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
                "department",
                "avatar",
                "groups",
            ]),
            token: user.generateAuthToken(),
        });
    }),

    adminLoginController: catchAsync(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password"); // select expiclity password

        if (!user)
            return res
                .status(400)
                .send({ success: false, message: "invalid email or password" });

        let validPassword = await user.correctPassword(password, user.password);
        if (!validPassword)
            return res.status(400).send({
                success: false,
                message: "Invalid email or password...",
            });

        if (user.role !== "admin")
            return res
                .status(403)
                .send({ success: false, message: "Access to the side denied" });

        res.status(200).json({
            success: true,
            message: `Login Successfull.`,
            admin: _.pick(user, [
                "_id",
                "firstname",
                "lastname",
                "username",
                "email",
                "scc",
                "role",
                "school",
                "department",
                "avatar",
            ]),
            token: user.generateAuthToken(),
        });
    }),

    registerController: catchAsync(async (req, res) => {
        const { firstname, lastname, email, username, scc, password } =
            req.body;

        // Check if user email or username exists
        let user = await User.findOne({ email });
        if (user)
            return res
                .status(400)
                .send({ success: false, message: "email already registered" });

        user = await User.findOne({ username });
        if (user)
            return res
                .status(400)
                .send({ success: false, message: "username taken" });

        user = await User.create({
            firstname,
            lastname,
            email,
            username,
            scc,
            password,
            groups: [scc],
        });

        // Generate Account Activation Link
        // const activationToken = user.createAccountActivationLink();

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        user.save({ validateBeforeSave: false });

        user = await User.findById(user._id).populate("scc");

        res.status(200).json({
            success: true,
            message: `Registration successfull.`,
            user: _.pick(user, [
                "_id",
                "firstname",
                "lastname",
                "username",
                "email",
                "scc",
                "role",
                "school",
                "department",
                "groups",
            ]),
            token: user.generateAuthToken(),
        });
    }),

    updatePasswordController: catchAsync(async (req, res) => {
        const { id, old_password, new_password } = req.body;

        // Check if user email or username exists
        let user = await User.findById(id).select("+password");
        if (!user)
            return res
                .status(400)
                .send({ success: false, message: "Invalid User ID" });

        let validPassword = await user.correctPassword(
            old_password,
            user.password
        );
        if (!validPassword)
            return res.status(400).send({
                success: false,
                message: "Wrong password...",
            });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(new_password, salt);

        user.save({ validateBeforeSave: false });

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

        let user = await User.findOne({ email });

        if (!user)
            return res
                .status(400)
                .send({ success: false, message: "Email not found" });

        // 3 Create Password Reset Token
        const resetToken = user.createPasswordResetToken();

        await user.save({ validateBeforeSave: false });

        const resetURL = `${process.env.APP_URL}reset-password/${resetToken}`;

        // Send email to create passowrd
        await sendEmail({
            to: email,
            from: process.env.FROM_EMAIL,
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
        // 1 Find the  user based on Token
        const hashedToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        let user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: {
                $gt: Date.now(),
            },
        });
        if (!user)
            return res.status(400).send({
                success: false,
                message: "Reset Password Link Invalid or Expired !",
            });

        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Reset Successfully",
        });
    }),
};
