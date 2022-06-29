"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("images", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            title: {
                type: Sequelize.STRING,
                required: true,
            },
            image: {
                type: Sequelize.STRING,
                required: true,
            },
            description: {
                type: Sequelize.STRING,
                required: true,
            },
            date: {
                type: Sequelize.DATE,
                required: true,
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
        await queryInterface.dropTable("images");
    },
};
