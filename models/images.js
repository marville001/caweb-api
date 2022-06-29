"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const { Sequelize } = sequelize;
    class images extends Model {
        static associate(models) {}
    }
    images.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            title: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            groupId: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            image: {
                type: DataTypes.STRING,
                required: true,
            },
            description: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            date: {
                type: DataTypes.DATE,
                required: true,
            },
        },
        {
            sequelize,
            modelName: "images",
            ableName: "images",
            timestamps: true,
            freezeTableName: true,
            underscored: false,
        }
    );
    return images;
};
