"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const { Sequelize } = sequelize;
    class Sccs extends Model {
        static associate(models) {
            // define association here
        }
    }
    Sccs.init(
        {
            _id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            name: {
                type: DataTypes.STRING,
                required: true,
            },
            key: {
                type: DataTypes.STRING,
                required: true,
            },
            category: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            image: {
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
            modelName: "sccs",
            tableName: "sccs",
            timestamps: true,
            freezeTableName: true,
            underscored: false,
        }
    );

    Sccs.associate = (models) => {
        Sccs.hasMany(models.membership, {
            foreignKey: "groupId",
        });
    };
    return Sccs;
};
