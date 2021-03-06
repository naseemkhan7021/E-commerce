const dotenv = require('dotenv');
const connectToDatabase = require('../../config/database');
const products = require('../../data/products.json');
const Product = require('../../model/product');

//
if (process.env.NODE_ENV !== 'PRODUCTION') {
     dotenv.config({ path: 'Shoping_Backend/config/config.env' });
} else dotenv.config();

// Database conection
connectToDatabase();

const productSeeder = async () => {
     try {
          await Product.deleteMany();
          console.log('All products deleted !!!');
          await Product.insertMany(products);
          console.log('Products add success full using seeder !!!!');
          process.exit(0) // 0 success seed
     } catch (error) {
          console.log(error.message);
          process.exit(1); // 1 feild seed
     }
};

productSeeder();

