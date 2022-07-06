"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const { Sequelize } = sequelize;

    class About extends Model {
        static associate(models) {}
    }
    About.init(
        {
            _id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            mission: {
                type: DataTypes.TEXT(500),
                required: true,
            },
            story: {
                type: DataTypes.TEXT(5000),
                required: true,
            },
        },
        {
            freezeTableName: true,
            timestamps: true,
            underscored: false,
            sequelize,
            tableName: "about",
            modelName: "about",
        }
    );
    return About;
};
