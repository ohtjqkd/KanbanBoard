'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      list_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lists',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      content: {
        allowNull: false,
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
      // queryInterface.addConstraint('cards', {
      //   fields: ['list_id'],
      //   type: 'foreign key',
      //   name: 'fk_list_id',
      //   references: {
      //     table: 'lists',
      //     field: 'id'
      //   },
      //   onDelete: 'cascade',
      //   onUpdate: 'cascade'
      // })
//    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cards');
  }
};