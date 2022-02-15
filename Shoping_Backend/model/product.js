const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
     name: {
          type: String,
          trim: true,
          required: [true, 'Please Enter the product name'],
          maxlength: [200, 'Product name cannnot exceed 100 characters']
     },
     price: {
          type: Number,
          required: [true, 'Please Enter the product price'],
          maxlength: [5, 'Price cannnot greater then 99999'],
          default: 0.0
     },
     description: {
          type: String,
          required: [true, 'Please Enter the product description'],
     },
     ratings: {
          type: Number,
          default: 0
     },
     images: [
          {
               public_id: {
                    type: String,
                    required: true
               },
               url: {
                    type: String,
                    required: true
               }
          }
     ],
     category: {
          type: String,
          required: [true, 'Please select the category for this product'],
          enum: {
               values: [
                    'Appliances',
                    'Apps & Games',
                    'Arts, Crafts, & Sewing',
                    'Automotive Parts & Accessories',
                    'Baby',
                    'Beauty & Personal Care',
                    'Books',
                    'CDs & Vinyl',
                    'Cell Phones & Accessories',
                    'Clothing, Shoes and Jewelry',
                    'Collectibles & Fine Art',
                    'Computers',
                    'Electronics',
                    'Garden & Outdoor',
                    'Grocery & Gourmet Food',
                    'Handmade',
                    'Health, Household & Baby Care',
                    'Home & Kitchen',
                    'Industrial & Scientific',
                    'Kindle',
                    'Luggage & Travel Gear',
                    'Movies & TV',
                    'Musical Instruments',
                    'Office Products',
                    'Pet Supplies',
                    'Sports & Outdoors',
                    'Tools & Home Improvement',
                    'Toys & Games',
                    'Video Games',
               ],
               message: 'Please select correct category for product'
          }
     },
     seller: {
          type: String,
          required: [true, 'Please Enter the product selller']
     },
     stock: {
          type: Number,
          required: [true, 'Please Enter the product stock'],
          default: 0
     },
     numberOfReviews: {
          type: Number,
          default: 0
     },
     reviews: [
          {
               user: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'User',
                    required: true
               },
               avtar: {
                    type: String,
                    required: true
               },
               name: {
                    type: String,
                    required: true
               },
               rating: {
                    type: Number,
                    required: true
               },
               comment: {
                    type: String,
                    required: true
               }
          }
     ],
     user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: true
     }
     // createdAt: {
     //      type: Date,
     //      default: Date.now
     // }
}, { timestamps: true });
// , { timestamps: true }
module.exports = mongoose.model('Product', productSchema)