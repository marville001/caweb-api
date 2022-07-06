"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("events", {
            _id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            title: {
                type: Sequelize.STRING,
            },
            key: {
                type: Sequelize.STRING,
            },
            group: {
                type: Sequelize.STRING,
            },
            groupId: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT(3000),
            },
            location: {
                type: Sequelize.STRING,
            },
            date: {
                type: Sequelize.DATE,
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
        await queryInterface.dropTable("events");
    },
};
