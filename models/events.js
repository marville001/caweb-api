"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const { Sequelize } = sequelize;

    class events extends Model {
        static associate(models) {}
    }
    events.init(
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
            key: {
                type: DataTypes.STRING,
                required: true,
            },
            group: {
                type: DataTypes.STRING,
                required: "",
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
                required: true,
            },
            location: {
                type: DataTypes.STRING,
                required: true,
            },
            date: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "events",
            tableName: "events",
            timestamps: true,
            freezeTableName: true,
            underscored: false,
        }
    );
    return events;
};
