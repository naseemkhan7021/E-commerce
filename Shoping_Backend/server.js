const app = require('./app');
const connectToDatabase = require('./config/database');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv')

// handle Uncaught exceptions Error (undefind verialbe or values)
process.on('uncaughtException', err => {
     console.log(`ERROR NAME: ${err.name} -> ERROR: ${err.stack}`);

     process.exit(1);
});

// setting up config files 
if (process.env.NODE_ENV !== 'PRODUCTION') {
     dotenv.config({ path: 'Shoping_Backend/config/config.env' });
} else dotenv.config();

// require('dotenv').config({ path: 'Shoping_Backend/config/config.env' });
const PORT = process.env.PORT || 8080;

// Database conection
connectToDatabase();

// config cloudinary
cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
});

// listen
const server = app.listen(PORT, () => {
     console.log(`server started on PORT ${PORT} as ${process.env.NODE_ENV} mode.`);
});

// handle unhandledRejection Error
process.on('unhandledRejection', err => {
     console.log(`ERROR NAME: ${err.name} -> ERROR: ${err.message}`);
     console.log('Shutting down the server due to Unhandled Promisse rejection');
     server.close(() => process.exit(1));
});   