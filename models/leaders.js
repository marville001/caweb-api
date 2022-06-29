"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const { Sequelize } = sequelize;

    class Leaders extends Model {
        static associate(models) {}
    }
    Leaders.init(
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
            scc: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            name: {
                type: DataTypes.STRING,
                required: true,
            },
            groupId: {
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
            churchCommittee: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
            isActive: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
            period: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
        },
        {
            sequelize,
            modelName: "leaders",
            tableName: "leaders",
            freezeTableName: true,
            timestamps: true,
            underscored: false,
        }
    );
    return Leaders;
};
