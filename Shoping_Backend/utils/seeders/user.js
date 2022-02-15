if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'Shoping_Backend/config/config.env' });
const connectToDatabase = require('../../config/database');
const users = require('../../data/users.json');
const user = require('../../model/user');
// const Product = require('../../model/product');


// Database conection
connectToDatabase();

const userSeeder = async () => {
     try {
          await user.deleteMany();
          console.log('All products deleted !!!');
          await user.insertMany(users);
          console.log('Products add success full using seeder !!!!');
          process.exit(0) // 0 success seed
     } catch (error) {
          console.log(error.message);
          process.exit(1); // 1 feild seed
     }
};

userSeeder();

