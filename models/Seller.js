
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


class Seller extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Seller.init({
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
      beforeCreate: async (newSellerData) => {
        newSellerData.password = await bcrypt.hash(newSellerData.password, 10);
        return newSellerData;
      },
      beforeUpdate: async (updatedSellerData) => {
        if (updatedSellerData.password) {
          updatedSellerData.password = await bcrypt.hash(updatedSellerData.password, 10);
        }
        return updatedSellerData
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'seller',
  }
);

module.exports = Seller;
