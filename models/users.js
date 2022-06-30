"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const { Sequelize } = sequelize;

    class User extends Model {
        static associate(models) {
            // define association here
        }
    }

    User.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            firstname: {
                type: DataTypes.STRING,
                required: true,
            },
            lastname: {
                type: DataTypes.STRING,
                required: true,
            },
            username: {
                type: DataTypes.STRING,
                required: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                required: true,
            },
            scc: {
                type: Sequelize.UUID,
                unique: true,
                required: true,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: "user",
            },
            school: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            password: {
                type: DataTypes.STRING,
            },
            passwordResetToken: DataTypes.STRING,
            passwordResetExpires: DataTypes.DATE,
            avatar: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:
                    "https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png",
            },
            activated: {
                type: DataTypes.INTEGER,
                default: 0,
            },
        },
        {
            freezeTableName: true,
            timestamps: true,
            underscored: false,
            sequelize,
            tableName: "users",
            modelName: "users",
        }
    );

    User.associate = (models) => {
        User.hasMany(models.blogs, {
            foreignKey: "author",
        });
        User.hasMany(models.membership, {
            foreignKey: "userId",
        });
    };
    return User;
};
