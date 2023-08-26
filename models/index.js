const Seller = require('./Seller');
const Buyer = require('./Buyer');
const Product = require('./Product');
const Order = require('./Order');

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

module.exports = { Seller, Buyer, Product, Order };