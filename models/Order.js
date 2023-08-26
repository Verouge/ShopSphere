

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Order extends Model {}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    buyer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'buyer',
            key: 'id',
        },
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'product',
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // default value of 1 for quantity
        validate: {
            min: 1, 
        }
    },
   
}, {
    sequelize,
    modelName: 'order',
    timestamps: true,
    underscored: true,
});

module.exports = Order;
