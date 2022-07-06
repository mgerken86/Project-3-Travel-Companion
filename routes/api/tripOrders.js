const express = require("express");
const router = express.Router();
const tripOrdersCtrl = require("../../controllers/api/tripOrders");
const { default: TripOrder } = require("../../src/components/TripOrder/TripOrder");

// GET /api/tripOrders/cart
router.get("/cart", tripOrdersCtrl.cart);
// GET /api/tripOrders/history
router.get("/history", tripOrdersCtrl.history);
// POST /api/tripOrders/cart/items/:id
router.post("/cart/new", tripOrdersCtrl.addToCart);
// POST /api/tripOrders/cart/checkout
router.post("/cart/checkout", tripOrdersCtrl.checkout);
// DELETE /api/tripOrders/history
// router.delete("/api/tripOrders/history", tripOrdersCtrl.cancelTrip)
router.delete("/history/:id", (req, res) => {
    console.log('id in tripOrders routes', req.params.id)
    TripOrder.findByIdAndDelete(req.params.id)
})

module.exports = router;
