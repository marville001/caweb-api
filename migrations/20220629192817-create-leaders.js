"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("leaders", {
            _id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            title: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "positions",
                    key: "_id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
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
                type: Sequelize.TEXT(1000),
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
