const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductImage extends Model {}

ProductImage.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'product',
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'product_image',
    tableName: 'product_images',
    timestamps: true,
    underscored: true,
});

module.exports = ProductImage;
