
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


class Buyer extends Model {}

Buyer.init({
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
              isEmail: true,
          },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        }
      }
      // additional attributes as needed
  }, {
    hooks: {
      beforeCreate: async (newBuyerData) => {
        newBuyerData.password = await bcrypt.hash(newBuyerData.password, 10);
        return newBuyerData;
      },
      beforeUpdate: async (updatedBuyerData) => {
        if (updatedBuyerData.password) {
          updatedBuyerData.password = await bcrypt.hash(updatedBuyerData.password, 10);
        }
        return updatedBuyerData
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'buyer',
  }
);

module.exports = Buyer;
