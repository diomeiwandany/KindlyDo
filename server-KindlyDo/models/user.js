'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field password must be filled (Null)"
        },
        notEmpty: {
          msg: "Field password must be filled (Empty)"
        },
        len: {
          args: [5, 255],
          msg: "Minimum length of password: 5 Character",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      },
    },
  });
  return User;
};