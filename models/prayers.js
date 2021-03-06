"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const { Sequelize } = sequelize;

    class Prayers extends Model {
        static associate(models) {
            // define association here
        }
    }
    Prayers.init(
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
            prayer: {
                type: DataTypes.TEXT(3000),
                required: true,
            },
        },
        {
            sequelize,
            modelName: "prayers",
            tableName: "prayers",
            freezeTableName: true,
            timestamps: true,
            underscored: false,
        }
    );
    return Prayers;
};
