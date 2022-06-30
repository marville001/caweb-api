"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("blogs", {
            _id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            title: {
                type: Sequelize.STRING,
            },
            subtitle: {
                type: Sequelize.STRING,
            },
            intro: {
                type: Sequelize.STRING,
            },
            slug: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.STRING,
                defaultValue: "",
            },
            author: {
                type: Sequelize.UUID,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: "users",
                    key: "_id",
                },
            },
            blog: {
                type: Sequelize.STRING,
            },
            active: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
            },
            allowComments: {
                type: Sequelize.INTEGER,
            },
            isDraft: {
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
        await queryInterface.dropTable("blogs");
    },
};
