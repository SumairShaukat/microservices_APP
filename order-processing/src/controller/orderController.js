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
console.log(userResponse.data, 'useeeeeeeeee')
        // Calculate total amount (you might want to ensure that items have a price field)
        const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);

        const newOrder = new Order({ userId, items, totalAmount }); // Adjusted to match your schema
        await newOrder.save();

        return res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating order', error });
    }
};



module.exports = { createOrder, getOrdersByUserId };
