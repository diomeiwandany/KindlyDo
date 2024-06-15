'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, { foreignKey: 'assigneeId' });
      User.hasOne(models.Task, { foreignKey: 'assignerId' });
    }
  }
  User.init({
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already exist",
      },
      validate: {
        notNull: {
          msg: "Field email must be filled (Null)"
        },
        notEmpty: {
          msg: "Field email must be filled (Empty)"
        },
        isEmail: {
          args: true,
          msg: "Invalid email format"
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
    modelName: 'User',
  });
  return User;
};