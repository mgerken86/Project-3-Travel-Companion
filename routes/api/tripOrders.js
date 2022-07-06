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
router.delete("/api/tripOrders/history", async (req, res) => {
    await TripOrder.findOneAndDelete({ _id: req.body._id})
})

module.exports = router;
