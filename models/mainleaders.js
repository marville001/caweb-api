"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const { Sequelize } = sequelize;

    class MainLeaders extends Model {
        static associate(models) {
            // define association here
        }
    }
    MainLeaders.init(
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
            name: {
                type: DataTypes.STRING,
                required: true,
            },
            image: {
                type: DataTypes.STRING,
                required: true,
            },
            description: {
                type: DataTypes.STRING,
                required: true,
            },
        },
        {
            sequelize,
            modelName: "mainleaders",
            tableName: "mainleaders",
            freezeTableName: true,
            timestamps: true,
            underscored: false,
        }
    );
    return MainLeaders;
};
