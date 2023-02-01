'use strict';
const {
  Model, Deferrable
} = require('sequelize');
const user = require('./user');
const workspace = require('./workspace');
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',        
      })
      this.belongsTo(models.workspace, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }
  }
  member.init({
    // userId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: user,
    //         key: 'id',
    //     },
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE',
    //     deferrable: Deferrable.INITIALLY_IMMEDIATE
    // },
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
    authority: {
        type: DataTypes.ENUM,
        values: ['owner', 'maintainer', 'member'],
    },
    // recent: {
    //   type: DataTypes.STRING,
    // }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'member',
  });
  return member;
};
