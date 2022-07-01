"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const { Sequelize } = sequelize;

    class Blog extends Model {
        static associate(models) {
            Blog.belongsTo(models.users, {
                foreignKey: "author",
            });
        }
    }

    Blog.init(
        {
            _id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            title: {
                type: DataTypes.STRING,
                required: true,
            },
            subtitle: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            intro: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            slug: {
                type: DataTypes.STRING,
                required: true,
            },
            image: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            author: {
                type: Sequelize.UUID,
                required: true,
            },
            blog: {
                type: DataTypes.STRING,
                required: true,
            },
            active: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
            allowComments: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
            isDraft: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: "blogs",
            freezeTableName: true,
            timestamps: true,
            underscored: false,
            tableName: "blogs",
        }
    );

    return Blog;
};
