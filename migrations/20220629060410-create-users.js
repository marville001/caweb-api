"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            _id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            firstname: {
                type: Sequelize.STRING,
                required: true,
            },
            lastname: {
                type: Sequelize.STRING,
                required: true,
            },
            username: {
                type: Sequelize.STRING,
                required: true,
            },
            email: {
                type: Sequelize.STRING,
                required: true,
            },
            scc: {
                type: Sequelize.STRING,
                required: true,
            },
            phoneNumber: {
                type: Sequelize.STRING,
            },
            role: {
                type: Sequelize.STRING,
            },
            school: {
                type: Sequelize.STRING,
                defaultValue: "",
            },
            password: {
                type: Sequelize.STRING,
            },
            passwordResetToken: Sequelize.STRING,
            passwordResetExpires: Sequelize.DATE,
            avatar: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            activated: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("users");
    },
};
