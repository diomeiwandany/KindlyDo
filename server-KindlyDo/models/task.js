'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, { foreignKey: 'assigneeId' });
      Task.belongsTo(models.User, { foreignKey: 'assignerId' });
    }
  }
  Task.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field name must be filled (Null)"
        },
        notEmpty: {
          msg: "Field name must be filled (Empty)"
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field description must be filled (Null)"
        },
        notEmpty: {
          msg: "Field description must be filled (Empty)"
        },
      },
    },
    assignerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field assignerId must be filled (Null)"
        },
        notEmpty: {
          msg: "Field assignerId must be filled (Empty)"
        },
      },
    },
    assigneeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field assigneeId must be filled (Null)"
        },
        notEmpty: {
          msg: "Field assigneeId must be filled (Empty)"
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field status must be filled (Null)"
        },
        notEmpty: {
          msg: "Field status must be filled (Empty)"
        },
      },
    },
    proUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: "Field proUser must be filled (Null)"
        },
        notEmpty: {
          msg: "Field proUser must be filled (Empty)"
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};