const Order = require('../models/orderModel');
const axios = require('axios');

// Get orders by userId
const getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ userId }); // Ensure you're querying with the correct field
        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving orders', error });
    }
};

const createOrder = async (req, res) => {
    const { userId, items } = req.body; // Changed from 'id' to 'userId' to match your schema
    try {
     const USER_SERVICE_URL = 'http://localhost:3000/api/users/getusers'

        const userResponse = await axios.get(`${USER_SERVICE_URL}`);;
        if (!userResponse.data) {
            return res.status(404).json({ message: 'User not found' });
        }
        const totalAmount = items.reduce((total, item) => {
            const productPrice = productPrices[item.productId]; // Get the price for the product
            if (productPrice) {
                return total + (productPrice * item.quantity);
            }
            return total;
        }, 0);

        // Ensure totalAmount is a number and not NaN
        if (isNaN(totalAmount) || totalAmount < 0) {
            return res.status(400).json({ message: 'Invalid total amount' });
        }
        const newOrder = new Order({ userId, items, totalAmount }); // Adjusted to match your schema
        await newOrder.save();

        return res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating order', error });
    }
};



module.exports = { createOrder, getOrdersByUserId };
