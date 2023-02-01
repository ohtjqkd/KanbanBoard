'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })//.then(function() {
      // queryInterface.addColumn('lists', 'fk_project_id', {
      //   type: Sequelize.Integer,
      //   references: {model: 'projects', key: 'id'}
      // })
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  }
};