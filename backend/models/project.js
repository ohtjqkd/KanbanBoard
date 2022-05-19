'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.project.hasMany(models.list, {
        foreignKey: 'project_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    }
  }
  project.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'project',
  });
  return project;
};