'use strict';
const {
  Model, Deferrable
} = require('sequelize');
const workspace = require('./workspace');
module.exports = (sequelize, DataTypes) => {
  class board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // id;
    // workSpaceId;
    // boardTitle;
    // visibility;
    static associate(models) {
      // define association here
      this.belongsTo(models.workspace, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      this.hasMany(models.list)
    }
  }
  board.init({
    // workSpaceId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: workspace,
    //         key: 'id',
    //     },
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE',
    //     deferrable: Deferrable.INITIALLY_IMMEDIATE
    // },
    boardTitle: {
      type: DataTypes.STRING,
    },
    visibility: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'board',
  });
  return board;
};
