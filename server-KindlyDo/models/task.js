'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, { foreignKey: 'assigneeId', as: 'assignee' });
      Task.belongsTo(models.User, { foreignKey: 'assignerId', as: 'assigner' });
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
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};