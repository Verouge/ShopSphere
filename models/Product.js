

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    seller_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'seller',
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'product',
    timestamps: true,
    underscored: true,
});

module.exports = Product;
