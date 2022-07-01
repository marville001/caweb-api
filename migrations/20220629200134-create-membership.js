"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("membership", {
            _id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "users",
                    key: "_id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            groupId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "sccs",
                    key: "_id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
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
        await queryInterface.dropTable("membership");
    },
};
