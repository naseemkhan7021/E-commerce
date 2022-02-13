const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const morgan = require('morgan');
const errorMiddleware = require('./middlewares/errors/errors');

// setting up config files 
require('dotenv').config({ path: 'shoping-backend/config/config.env' });

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());



const bassurl = process.env.BASS_URL // api/v1


// emport routes 
const product = require('./route/product');
const userRoute = require('./route/auth');
const orderRoute = require('./route/order');
const paymentRoute = require('./route/payment');


// middlewares 
app.use(morgan('dev'));
// app.use(cors());
app.use(cors({
     origin: 'http://localhost:3000',
     credentials: true,
     // allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
}));
// app.set('trust proxy', 1);

// endpoints 
// app.get('/',(req,res)=>{
//      res.status(200).json({message:'ok find it!!!'})
// });
app.use(bassurl, product);
app.use(bassurl, userRoute);
app.use(bassurl, orderRoute);
app.use(`${bassurl}/payment`, paymentRoute)


// add front static files
if (process.env.NODE_ENV === 'PRODUCTION') {
     app.use(express.static(path.join(__dirname, '../shoping_front/build')));

     app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname, '../shoping_front/build/index.html'))
     })
}

// error middlewares
app.use(errorMiddleware)

module.exports = app;