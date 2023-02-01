'use strict';
const {
  Model, Deferrable
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class workspace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.board)
      this.hasMany(models.member)
      this.belongsTo(models.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  workspace.init({
  //   ownerId: {
  //       type: DataTypes.INTEGER,
  //       references: {
  //           model: user,
  //           key: 'id',
  //       },
  //       onDelete: 'CASCADE',
  //       onUpdate: 'CASCADE',
  //       deferrable: Deferrable.INITIALLY_IMMEDIATE
    // },
    workSpaceName: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    visibility: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'workspace',
  });
  return workspace;
};
