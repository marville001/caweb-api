"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const { Sequelize } = sequelize;

    class Positions extends Model {
        static associate(models) {
            // define association here
        }
    }
    Positions.init(
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
            description: {
                type: DataTypes.TEXT(1000),
                required: true,
            },
        },
        {
            sequelize,
            modelName: "positions",
            tableName: "positions",
            freezeTableName: true,
            timestamps: true,
            underscored: false,
        }
    );

    Positions.associate = (models) => {
        Positions.hasMany(models.leaders, {
            foreignKey: "title",
        });
    };
    return Positions;
};
