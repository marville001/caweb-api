"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("about", {
            _id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            mission: {
                type: Sequelize.STRING,
                required: true,
            },
            story: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("about");
    },
};
