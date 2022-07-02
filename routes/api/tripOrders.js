const express = require('express');
const router = express.Router();
const tripOrdersCtrl = require('../../controllers/api/tripOrders');

// GET /api/orders/cart
router.get('/cart', tripOrdersCtrl.cart);
// GET /api/orders/history
router.get('/history', tripOrdersCtrl.history);
// POST /api/orders/cart/items/:id
router.post('/cart/items/:id', tripOrdersCtrl.addToCart);
// POST /api/orders/cart/checkout
router.post('/cart/checkout', tripOrdersCtrl.checkout);

module.exports = router;
