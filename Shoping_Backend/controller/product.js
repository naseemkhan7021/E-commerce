const Product_model = require("../model/product");
// error handel globle
const catchAsyncErrors = require("../middlewares/errors/catchAsyncErrors"); // catch error promiss base
const ErrorHandller = require("../utils/handleError/errorHandller");
const APIfeatures = require("../utils/helper/apiFeatures");
const cloudinary = require('cloudinary');


//POST create new product ==> /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
     let images = [];
     if (typeof req.body.images === 'string') {
          images.push(req.body.images)
     } else {
          images = req.body.images
     }
     let imgLinks = [];
     for (let index = 0; index < images.length; index++) {
          const result = await cloudinary.v2.uploader.upload(images[index], {
               folder: 'products'
          });
          imgLinks.push({
               public_id: result.public_id,
               url: result.secure_url
          });

     }

     if (!req.body) {
          // return res.status(501).json({ success: false, message: 'please set the data' })
          return next(new ErrorHandller('please set the data', 501)); // come from utils folder globle error handel
     };
     req.body.images = imgLinks
     req.body.user = req.user.id;
     const product = await Product_model.create(req.body);
     return res.status(201).json({
          success: true,
          product
     });

});

// GET show all products by Admin ==> /api/v1/admin/products
exports.showAllProducts = catchAsyncErrors(async (req, res, next) => {
     const products = await Product_model.find();
     let outOfStockProducts = 0;
     products.forEach(product => {
          if (product.stock == 0) {
               outOfStockProducts += 1
          }
     })
     res.status(200).json({
          success: true,
          totalProducts: products.length,
          outOfStockProducts,
          products
     })
})

//GET show all products ==> /api/v1/products?keyword=ThinkCentre&category=Computers&price[gt]=1000&price[lt]=15000&page=3
exports.showproducts = catchAsyncErrors(async (req, res, next) => {
     // return next(new ErrorHandller('My error !!!', 400));
     const resPerPage = 8;
     const totalProductCount = await Product_model.countDocuments();
     // APIfeatures
     const apiFeatures = new APIfeatures(Product_model.find().sort({ createdAt: -1 }), req.query)
          .search()
          .filter()
          .pagination(resPerPage)

     let products = await apiFeatures.query;
     let pageDataLen = products.length;


     // apiFeatures.pagination(resPerPage);
     // products = await apiFeatures.query;

     // setTimeout(() => {
     return res.status(200).json({
          success: true,
          pageDataLen,
          resPerPage,
          totalProductCount,
          products
     });
     // }, 2000);

     // Product_model.find(async (error, result) => {
     //      if (error || !result) {
     //           // return res.status(401).json({ success: false, message: 'some error !!' })
     //           return next(new ErrorHandller('some error !!', 401)); // come from utils folder globle error handel
     //      }
     //      const apiFeatures = new APIfeatures(result,req.query).search();
     //      const results = await apiFeatures.query;

     //      return res.status(200).json({
     //           success: true,
     //           count: results.length,
     //           products: results
     //      })
     // })
});

//GET show single product by it id ==> /api/v1/product/:p_id --> product_id
exports.showSingleProduct = catchAsyncErrors((req, res, next) => {
     Product_model.findById(req.params.p_id).exec((error, result) => {
          if (error || !result) {
               // return res.status(404).json({ success: false, message: 'No product found !!!' });
               return next(new ErrorHandller('No product found !!!', 404)); // come from utils folder globle error handel
          }
          return res.status(201).json({
               success: true,
               product: result
          })
     })
});

//PUTCH update single product by id ==> /api/v1/admin/product/:p_id --> product_id
exports.updateSingleProduct = catchAsyncErrors(async (req, res, next) => {
     if (!req.body) {
          // return res.status(204).json({ success: false, message: 'Please provide some more details !!!' })
          return next(new ErrorHandller('Please provide details !!!', 402)); // come from utils folder globle error handel
     }

     let images = [];
     if (typeof req.body.images === 'string') {
          images.push(req.body.images)
     } else {
          images = req.body.images
     }
     if (req.body.images !== undefined) {
          const product = await Product_model.findById(req.params.p_id);
          for (let index = 0; index < product.images.length; index++) {
               const result = await cloudinary.v2.uploader.destroy(product.images[index].public_id);
          }

          let imgLinks = [];
          for (let index = 0; index < images.length; index++) {
               const result = await cloudinary.v2.uploader.upload(images[index], {
                    folder: 'products'
               });
               imgLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url
               });

          }
          req.body.images = imgLinks
     }
     Product_model.findByIdAndUpdate(req.params.p_id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false
     }).exec((error, result) => {
          if (error || !result) {
               // return res.status(402).json({ success: false, message: 'Unable to update Product data or Product not found' })
               return next(new ErrorHandller('Unable to update Product data or Product not found', 404)); // come from utils folder globle error handel
          }
          return res.status(202).json({ success: true, product: result })
     })
});

//DELETE delete product by id ==> /api/v1/admin/product/:p_id --> product_id
exports.deleteSingleProduct = catchAsyncErrors(async (req, res, next) => {
     try {
          const product = await Product_model.findById(req.params.p_id)
          if (!product) {
               return next(new ErrorHandller('Unable to perporm action or Product not found', 404)); // come from utils folder globle error handel
          }
          for (let index = 0; index < product.images.length; index++) {
               const result = await cloudinary.v2.uploader.destroy(product.images[index].public_id);

          }

          product.remove()
          res.status(200).json({
               success: true,
               message: 'Product deleted successfyll !!'
          })
          // product.exec((error, result) => {

          //      if (error || !result) {
          //           // return res.status(404).json({ success: false, message: 'Unable to perporm action or Product not found' })

          //      }
          //      return res.status(201).json({ success: true, message: 'Product deleted successfyll !!' })

          // })
     } catch (error) {
          return res.status(501).json({ success: false, message: `error catched ${error.message}` })
     }
});


// PUT add or update product review
exports.addOrUpdateReview = catchAsyncErrors(async (req, res, next) => {
     const avtar = await req.user.avtar.url

     const review = {
          name: req.user.name,
          avtar: avtar,
          user: req.user.id,
          rating: Number(req.body.rating),
          comment: req.body.comment
     };
     const product = await Product_model.findById(req.body.productId);
     const isReview = product.reviews.find(r => r.user.toString() === req.user.id.toString())

     if (isReview) {
          product.reviews.forEach(review => {
               if (review.user.toString() === req.user.id.toString()) {
                    review.rating = req.body.rating;
                    // review.avtar = avtar;
                    review.comment = req.body.comment;
               };
          });
     } else {
          product.reviews.push(review);
          product.numberOfReviews = product.reviews.length;
     }

     product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

     await product.save();
     res.status(200).json({ success: true, message: 'review add successfully!!!' })

});

// GET all the review of product ==> /api/v1/reviews 
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
     const product = await Product_model.findById(req.query.id);
     res.status(200).json({ success: true, totalReviews: product.reviews.length, reviews: product.reviews })
});

// DELETE product review ==> /api/v1/review?productId=sdf&reviewId=SDSA6465465s4d56f4
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
     const product = await Product_model.findById(req.query.productId);
     const reviews = product.reviews.filter(item => item.id.toString() !== req.query.reviewId);
     const numberOfReviews = reviews.length;
     const ratings = numberOfReviews > 0 ? product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length : 0;
     await Product_model.findByIdAndUpdate(req.query.productId, { reviews, numberOfReviews, ratings },
          {
               new: true,
               runValidators: true,
               useFindAndModify: false
          });
     res.status(200).json({ success: true, message: "review deleted successfully !!" })
})