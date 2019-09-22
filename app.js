const express  = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productsRoutes = require('./api/routes/products');
const ordereRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://dorbenmoyal:Dd123123@cluster0-8k5n6.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true ,useUnifiedTopology :true} );

//MiddleWares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//Middle ware adding header to every response
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    //define witch kind of headers Accepts
    res.header('Access-Control-Allow-Headers','*');

    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    //Calling next that the outher routes can take over
    next();
});

//Routes
app.use('/products',productsRoutes);
app.use('/orders',ordereRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status= 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
});

module.exports=app; 