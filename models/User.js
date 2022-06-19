const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "Please tell us your name!"],
            trim: true,
            maxlength: [20, "must be less than or equal to 20"],
            minlength: [3, "must be greater than 3"],
        },
        lastname: {
            type: String,
            required: [true, "Please tell us your name!"],
            trim: true,
            maxlength: [20, "must be less than or equal to 20"],
            minlength: [3, "must be greater than 3"],
        },
        email: {
            type: String,
            required: [true, "Please provide your email"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        username: {
            type: String,
            required: [true, "Please provide your username"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        scc: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Scc",
            required: "true",
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: [8, "must be greater than 8"],
            select: false,
        },
        activationLink: {
            type: String,
        },
        passwordResetToken: String,
        passwordResetExpires: Date,
        activated: {
            type: Boolean,
            default: false,
        },
        school: {
            type: String,
            default: "",
        },
        department: {
            type: String,
            default: "",
        },
        avatar: {
            type: String,
            default:
                "https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png",
        },
        groups: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Scc",
            default: [],
        },
    },
    { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, email: this.email, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );
    return token;
};

userSchema.methods.createAccountActivationLink = function () {
    const activationToken = crypto.randomBytes(32).toString("hex");
    this.activationLink = crypto
        .createHash("sha256")
        .update(activationToken)
        .digest("hex");
    return activationToken;
};

// comparing password
userSchema.methods.correctPassword = async function (
    candidate_Password,
    user_Password
) {
    return await bcrypt.compare(candidate_Password, user_Password);
};

// Create a reset token for each user
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
