const express = require('express');
const router = express.Router();

const orderProducts = require('./api/OrderProducts/orderProducts.controller');
const orders = require('./api/Orders/orders.controller');
const products = require('./api/Products/products.controller');
const users = require('./api/Users/users.controller');

router.use("/ordersProducts", orderProducts);
router.use("/orders", orders);
router.use("/products", products);
router.use("/users", users);

module.exports = router;