const express = require("express");
const router = express.Router();
const tripOrdersCtrl = require("../../controllers/api/tripOrders");


// GET /api/tripOrders/cart
router.get("/cart", tripOrdersCtrl.cart);
// GET /api/tripOrders/history
router.get("/history", tripOrdersCtrl.history);
// POST /api/tripOrders/cart/items/:id
router.post("/cart/new", tripOrdersCtrl.addToCart);
// POST /api/tripOrders/cart/checkout
router.post("/cart/checkout", tripOrdersCtrl.checkout);
// DELETE /api/tripOrders/history
router.delete("/history/:id", tripOrdersCtrl.cancelTrip)


module.exports = router;
