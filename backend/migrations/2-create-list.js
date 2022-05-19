'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
    })
    // }).then(function() {
    //   queryInterface.addConstraint('lists', {
    //     fields: ['project_id'],
    //     type: 'foreign key',
    //     name: 'fk_project_id',
    //     references: {
    //       table: 'projects',
    //       field: 'id'
    //     },
    //     onDelete: 'cascade',
    //     onUpdate: 'cascade'
    //   })
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lists');
  }
};