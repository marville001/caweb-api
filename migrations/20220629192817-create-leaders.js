"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("leaders", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            title: {
                type: Sequelize.STRING,
            },
            scc: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            groupId: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            churchCommittee: {
                type: Sequelize.INTEGER,
            },
            isActive: {
                type: Sequelize.INTEGER,
            },
            period: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("leaders");
    },
};