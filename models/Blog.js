const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            default: "",
        },
        intro: {
            type: String,
            default: "",
        },
        slug: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "",
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        blog: {
            type: String,
            required: true,
        },
        comments: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: [],
        },
        active: {
            type: Boolean,
            default: true,
        },
        allowComments: {
            type: Boolean,
            default: true,
        },
        publishDate: {
            type: String,
            default: "",
        },
        isDraft: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
