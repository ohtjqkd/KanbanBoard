'use strict';
const {
  Model, Deferrable
} = require('sequelize');
const list = require('./list');
module.exports = (sequelize, DataTypes) => {
  class card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.list, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }
  }
  card.init({
    // listId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: list,
    //     key: 'id'
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    //   deferrable: Deferrable.INITIALLY_IMMEDIATE
    // },
    cardTitle: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // dueDate: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    position: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'card',
  });
  return card;
};