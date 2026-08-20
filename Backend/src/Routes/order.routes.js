const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
	createPaymentOrder,
	verifyPayment,
} = require("../Controllers/order.controller");

const orderRoute = express.Router();

orderRoute.post("/payment-order", authMiddleware, createPaymentOrder);
orderRoute.post("/verify-payment", authMiddleware, verifyPayment);

module.exports = orderRoute;
