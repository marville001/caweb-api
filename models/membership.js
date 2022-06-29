"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const { Sequelize } = sequelize;

    class Membership extends Model {
        static associate(models) {
            // define association here
        }
    }
    Membership.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            userId: {
                type: DataTypes.STRING,
                required: true,
            },
            groupId: {
                type: DataTypes.STRING,
                required: true,
            },
        },
        {
            sequelize,
            modelName: "membership",
            tableName: "membership",
            freezeTableName: true,
            timestamps: true,
            underscored: false,
        }
    );
    return Membership;
};
