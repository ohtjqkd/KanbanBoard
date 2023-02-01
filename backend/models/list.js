'use strict';
const {
  Model, Deferrable
} = require('sequelize');
const board = require('./board');
module.exports = (sequelize, DataTypes) => {
  class list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.board, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      this.hasMany(models.card)
    }
  }
  list.init({
    // boardId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //       model: board,
    //       key: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    //   deferrable: Deferrable.INITIALLY_IMMEDIATE
    // },
    listTitle: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'list',
  });
  return list;
};