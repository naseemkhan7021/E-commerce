const express = require("express");
const { showproducts, newProduct, showSingleProduct, updateSingleProduct, deleteSingleProduct, addOrUpdateReview, getProductReviews, deleteReview, showAllProducts } = require("../controller/product");
const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth/checkAuth");
// const { isAuthenticatedUser } = require("../middlewares/auth/checkAuth");

const route = express.Router();

// show all products
route.get('/products', showproducts);
// show single product
route.get('/product/:p_id', showSingleProduct); // p_id --> product_id

// review
route.route('/review').put(isAuthenticatedUser, addOrUpdateReview).delete(isAuthenticatedUser, deleteReview);
route.get('/reviews', isAuthenticatedUser, getProductReviews);

// ADMIN 
// create product 
route.post('/admin/product/new', isAuthenticatedUser, authorizeRole('admin'), newProduct);
route.get('/admin/products', isAuthenticatedUser, authorizeRole('admin'), showAllProducts);
// update single product
route.route('/admin/product/:p_id').put(isAuthenticatedUser, authorizeRole('admin'), updateSingleProduct).delete(isAuthenticatedUser, authorizeRole('admin'), deleteSingleProduct); // if url is same but defrend action
// delete single product
// route.delete('/admin/product/:p_id',deleteSingleProduct); // or you can use it ***


module.exports = route;