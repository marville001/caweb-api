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
            id: {
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
                type: DataTypes.STRING,
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
    return Sccs;
};
