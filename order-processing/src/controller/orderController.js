const Order = require('../models/orderModel');
const axios = require('axios');

// Create a new order
const createOrder = async (req, res) => {
    const { userId, items } = req.body;

    try {
        // Validate user
        const userResponse = await axios.get(`${process.env.USER_SERVICE_URL}/users/${userId}`);
        if (!userResponse.data) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Calculate total amount (assuming each item has a price field, you may need to adjust)
        const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

        const newOrder = new Order({ userId, items, totalAmount });
        await newOrder.save();

        return res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating order', error });
    }
};

// Get orders by userId
const getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ userId });
        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving orders', error });
    }
};

module.exports = { createOrder, getOrdersByUserId };
