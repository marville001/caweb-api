"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const { Sequelize } = sequelize;

    class About extends Model {
        static associate(models) {}
    }
    About.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            mission: {
                type: DataTypes.STRING,
                required: true,
            },
            story: {
                type: DataTypes.STRING,
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
