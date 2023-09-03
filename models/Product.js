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
        allowNull: false,
    },
    seller_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'seller',
            key: 'id',
        },
    },

    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categories',
            key: 'id',
        },
    },

    quantity: {  // Adding the quantity attribute
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,  
        validate: {
            min: 1,  
        }
    }
}, {
    sequelize,
    modelName: 'product',
    tableName: 'product',
    timestamps: true,
    underscored: true,
});

module.exports = Product;
