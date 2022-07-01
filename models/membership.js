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
            _id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            userId: {
                type: Sequelize.UUID,
                required: true,
                references: {
                    model: "users",
                    key: "_id",
                },
            },
            groupId: {
                type: Sequelize.UUID,
                required: true,
                references: {
                    model: "sccs",
                    key: "_id",
                },
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

    Membership.associate.associate = (models) => {
        Membership.belongsTo(models.sccs, {
            foreignKey: "groupId",
            onDelete: "CASCADE",
        });

        Membership.belongsTo(models.users, {
            foreignKey: "userId",
            onDelete: "CASCADE",
        });
    };

    return Membership;
};
