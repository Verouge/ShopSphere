const Seller = require('./Seller');
const Buyer = require('./Buyer');
const Product = require('./Product');
const Order = require('./Order');
const ProductImage = require('./ProductImage');
const Category = require('./Category');


Seller.hasMany(Product, {
  foreignKey: 'seller_id',
  onDelete: 'CASCADE', // listed items will be deleted with seller(if deleted)
});

Product.belongsTo(Seller, {
  foreignKey: 'seller_id',
});

Buyer.hasMany(Order, {
  foreignKey: 'buyer_id',

});

Order.belongsTo(Buyer, {
  foreignKey: 'buyer_id',
});

Product.hasMany(Order, {
  foreignKey: 'product_id',
});

Order.belongsTo(Product, {
  foreignKey: 'product_id'
});

Product.hasMany(ProductImage, {
  foreignKey: 'product_id',
  as: 'product_images'
});

ProductImage.belongsTo(Product, {
  foreignKey: 'product_id'
});

// Relationship between Category and Product
// Category.hasMany(Product, {
//   foreignKey: 'category_id',
//   onDelete: 'CASCADE',
// });

// Product.belongsTo(Category, {
//   foreignKey: 'category_id',
// });



module.exports = { Seller, Buyer, Product, Order, ProductImage, Category };