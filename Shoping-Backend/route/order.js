const express = require("express");

const { newOrder, singleOrder, myOrders, allOrders, updateOrder, deleteOrder } = require("../controller/order");
const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth/checkAuth");
const route = express.Router();


// route.route('/order');

route.post('/order/new', isAuthenticatedUser, newOrder);
route.get('/order/:o_id', isAuthenticatedUser, singleOrder);
route.get('/orders/my', isAuthenticatedUser, myOrders);

// admin route 
route.get('/admin/orders', isAuthenticatedUser, authorizeRole('admin'), allOrders);
route.route('/admin/order/:o_id').patch(isAuthenticatedUser, authorizeRole('admin'), updateOrder).delete(isAuthenticatedUser, authorizeRole('admin'), deleteOrder);


module.exports = route;