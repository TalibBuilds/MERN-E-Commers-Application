const mongoose = require("mongoose");
const Food = require("../models/uploadFood.model");
const Order = require("../models/order.model");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.TEST_API_KEY,
    key_secret: process.env.TEST_KEY_SECRET,
});

async function createPaymentOrder(req, res) {
    try {
        const { items } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "At least one food item is required",
            });
        }

        const foodIds = items.map((item) => item.foodId);
        const hasInvalidItem = items.some(
            (item) =>
                !mongoose.isValidObjectId(item.foodId) ||
                !Number.isInteger(item.quantity) ||
                item.quantity < 1
        );

        if (hasInvalidItem || new Set(foodIds).size !== foodIds.length) {
            return res.status(400).json({
                message: "Invalid food item or quantity",
            });
        }

        const foods = await Food.find({
            _id: { $in: foodIds },
            isAvailable: true,
        }).select("_id foodName price foodImage");

        if (foods.length !== items.length) {
            return res.status(400).json({
                message: "One or more food items are unavailable",
            });
        }

        const quotedItems = items.map((item) => {
            const food = foods.find(
                (candidate) => candidate._id.toString() === item.foodId
            );

            return {
                foodId: food._id,
                foodName: food.foodName,
                foodImage: food.foodImage,
                quantity: item.quantity,
                price: food.price,
                subtotal: food.price * item.quantity,
            };
        });

        const totalAmount = quotedItems.reduce(
            (total, item) => total + item.subtotal,
            0
        );

        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(totalAmount * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        const order = await Order.create({
            user: req.user.id,
            items: quotedItems.map((item) => ({
                food: item.foodId,
                quantity: item.quantity,
                priceAtPurchase: item.price,
            })),
            totalAmount,
            razorpayOrderId: razorpayOrder.id,
        });

        return res.status(201).json({
            keyId: process.env.TEST_API_KEY,
            razorpayOrderId: razorpayOrder.id,
            orderId: order._id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            item: quotedItems[0],
        });
    } catch (error) {
        console.error("CreatePaymentOrder error:", error);
        return res.status(500).json({
            message: error.message || "Unable to create payment order",
        });
    }
}

async function verifyPayment(req, res) {
    try {
        const {
            orderId,
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature,
        } = req.body;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.TEST_KEY_SECRET)
            .update(`${razorpayOrderId}|${razorpayPaymentId}`)
            .digest("hex");

        if (expectedSignature !== razorpaySignature) {
            return res.status(400).json({
                message: "Invalid Razorpay payment signature",
            });
        }

        const order = await Order.findOneAndUpdate(
            {
                _id: orderId,
                user: req.user.id,
                razorpayOrderId,
            },
            {
                razorpayPaymentId,
                razorpaySignature,
                paymentStatus: "paid",
                orderStatus: "confirmed",
            },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({
            message: "Payment verified successfully",
            order,
        });
    } catch (error) {
        console.error("VerifyPayment error:", error);
        return res.status(500).json({
            message: "Unable to verify payment",
        });
    }
}

module.exports = {
    createPaymentOrder,
    verifyPayment,
};
