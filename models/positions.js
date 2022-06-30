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
            id: {
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
                type: DataTypes.STRING,
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

        const Leader_Position = sequelize.define(
            "Leader_Position",
            {},
            { timestamps: false }
        );
    };
    return Positions;
};
