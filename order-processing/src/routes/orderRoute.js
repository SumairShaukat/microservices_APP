const express = require('express');
const { createOrder, getOrdersByUserId } = require('../controller/orderController');

const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders/:userId', getOrdersByUserId);

module.exports = router;
