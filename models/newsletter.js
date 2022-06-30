"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const { Sequelize } = sequelize;

    class Newsletter extends Model {
        static associate(models) {
            // define association here
        }
    }
    Newsletter.init(
        {
            _id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            email: {
                type: DataTypes.STRING,
                required: true,
            },
            type: {
                type: DataTypes.STRING,
                defaultValue: "all",
            },
            subscribed: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
        },
        {
            sequelize,
            modelName: "newsletters",
            tableName: "newsletters",
            freezeTableName: true,
            timestamps: true,
            underscored: false,
        }
    );
    return Newsletter;
};
