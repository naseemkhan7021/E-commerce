const order_Model = require('../model/order');
const Product_model = require('../model/product');

const catchAsyncErrors = require('../middlewares/errors/catchAsyncErrors');
const ErrorHandller = require('../utils/handleError/errorHandller');

// POST Create new order ==> /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {

     req.body.paidAt = Date.now();
     req.body.user = req.user.id; // add user in body
     const order = await order_Model.create(req.body);
     if (!order) {
          return next(new ErrorHandller('Order Not place  becouse some error!!!', 501))
     }
     res.status(200).json({ success: true, message: "order succesfully place !!", order });
});

//GET single order ==> /api/v1/order/:o_id
exports.singleOrder = catchAsyncErrors(async (req, res, next) => {
     const order = await order_Model.findById(req.params.o_id).populate('user', 'name email');
     if (!order) {
          return next(new ErrorHandller('Order not found !!!', 404));
     }
     res.status(200).json({ success: true, order });
})

//GET all orders by user id ==> /api/v1/order/my
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
     const orders = await order_Model.find({ user: req.user.id }).populate('user');
     if (!orders) {
          return next(new ErrorHandller('Order not found !!!', 404));
     }
     res.status(200).json({ success: true, orders });
})


// admin routes 
//GET all orders ADMIN ==> /api/v1/order/admin/show/all
exports.allOrders = catchAsyncErrors(async (req, res, next) => {

     const orders = await order_Model.find().populate('user', 'name email');

     let totalAmount = 0;

     if (!orders) {
          return next(new ErrorHandller('Order not found !!!', 404));
     }
     await orders.forEach(order => totalAmount += order.totalPrice) // access total order about
     res.status(200).json({ success: true, totalAmount, totalOrders: orders.length, orders });
})

//PATCH update sing order by ADMIN route ==> /api/v1/admin/order/:o_id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
     const order = await order_Model.findById(req.params.o_id);
     if (!order) {
          return next(new ErrorHandller('Order not found !!!', 404));
     }
     if (order.orderStatus === 'Delivered') {
          return next(new ErrorHandller('you have Already deliverd this order !!!', 400));
     }
     order.orderItems.forEach(async item => {
          await updateStack(item.product_id, item.quantity);
     });
     order.orderStatus = req.body.status;
     order.deliveredAt = Date.now();
     await order.save();

     res.status(200).json({ success: true, message: 'Order updated succesfully !!!' });
});
//PATCH  update order helper for update stack 
function updateStack(id, quantity) {
     // $inc user increament of '-' for decreases 
     Product_model.findByIdAndUpdate(id, { $inc: { stock: -quantity } }, (error, result) => {
          if (error || !result) {
               return next(new ErrorHandller('Stack not update', 400));
          }
     });
};

// DELETE order by ADMIN ==> /api/v1/admin/order/:o_id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
     const order = await order_Model.findById(req.params.o_id);
     if (!order) {
          return next(new ErrorHandller('Order not found with this ID !!!', 404));
     }
     await order.remove();
     res.status(200).json({ success: true, message: 'Order delete succesfully !!!' });
});
